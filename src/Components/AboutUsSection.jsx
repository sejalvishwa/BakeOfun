import "./AboutUsSection.css"; // optional CSS file for styling

export const AboutUsSection = ({ 
  title, 
  paragraphs, 
  showLearnMore = false, 
  onLearnMoreClick 
}) => {
  return (
    <div className="about-us-section">
      {title && <h1>{title}</h1>}

      {paragraphs.map((para, index) => (
        <p key={index}>
          {para.map((line, i) => 
            typeof line === "string" 
              ? line 
              : <span key={i} className="center-line">{line}</span>
          ).reduce((prev, curr, j) => [prev, <br key={`br-${index}-${j}`} />, curr])}
        </p>
      ))}

      {showLearnMore && (
        <div className="learn-more-btn">
          <button onClick={onLearnMoreClick}>Learn More</button>
        </div>
      )}
    </div>
  );
};
