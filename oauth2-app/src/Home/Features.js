import React from 'react';
import './home.css'; 
import '../Home/bootstrap.min.css';
import featureImg1 from '../assets/img/featured-01.png';
import featureImg2 from '../assets/img/featured-02.png';
import featureImg3 from '../assets/img/featured-03.png';
import featureImg4 from '../assets/img/featured-04.png';

const Features = () => {
  const featuresData = [
    {
      id: 1,
      imgSrc: featureImg1,
      altText: 'Feature 1',
      title: 'Feature 1',
      link: '#',
    },
    {
      id: 2,
      imgSrc: featureImg2,
      altText: 'Feature 2',
      title: 'Feature 2',
      link: '#',
    },
    {
      id: 3,
      imgSrc: featureImg3,
      altText: 'Feature 3',
      title: 'Feature 3',
      link: '#',
    },
    {
      id: 4,
      imgSrc: featureImg4,
      altText: 'Feature 4',
      title: 'Feature 4',
      link: '#',
    },
  ];

  return (
    <div className="features">
      <div className="container">
        <div className="row">
          {featuresData.map((feature) => (
            <div className="col-lg-3 col-md-6" key={feature.id}>
              <a href={feature.link}>
                <div className="item">
                  <div className="image">
                    <img src={feature.imgSrc} alt={feature.altText} style={{ maxWidth: '44px' }} />
                  </div>
                  <h4>{feature.title}</h4>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
