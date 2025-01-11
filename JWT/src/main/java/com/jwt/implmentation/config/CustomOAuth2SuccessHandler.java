package com.jwt.implmentation.config;

import com.jwt.implmentation.JWTservice.JWTService;
import com.jwt.implmentation.entity.User;
import com.jwt.implmentation.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import java.io.IOException;
import java.util.Map;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final JWTService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2SuccessHandler.class);

    @Value("${app.oauth2.redirect-uri:/home}")
    private String redirectUri;

    public CustomOAuth2SuccessHandler(UserService userService, JWTService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        logger.debug("Authentication success handler triggered");

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        logger.debug("OAuth2User retrieved: {}", oauth2User);

        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        logger.info("User information: Email = {}, Name = {}", email, name);

        User user = userService.findByEmail(email).orElseGet(() -> {
            logger.info("User not found, creating new user: Email = {}, Name = {}", email, name);
            return userService.createNewUser(email, name);
        });

        logger.info("User {} logged in successfully", email);

        Map<String, Object> claims = Map.of(
                "sub", user.getEmail(),
                "name", user.getName()
        );

        String token = jwtService.generateToken(claims, user);
        logger.info("Generated JWT Token for user {}: {}", email, token);

        response.setHeader("Authorization", "Bearer " + token);

        String redirectUrl = UriComponentsBuilder.fromUriString(redirectUri)
                .build().toUriString();
        logger.debug("Redirecting to URL: {}", redirectUrl);

        response.sendRedirect(redirectUrl);
    }
}
