package com.oauth.google;

import com.oauth.google.Entity.GoogleUser;
import com.oauth.google.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/current-user")
    public UserInfo getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String name = oauth2User.getAttribute("name");
            String email = oauth2User.getAttribute("email");

            // Save to DB if not already present
            if (!userRepository.existsByEmail(email)) {
                GoogleUser user = new GoogleUser(name, email);
                userRepository.save(user);
            }

            return new UserInfo(name, email); // Return only name and email
        }
        return null; // If no user is authenticated
    }
}
