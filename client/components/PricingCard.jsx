import React from 'react';

export default function PricingCard({ plan, price, features, onSelect, highlighted = false }) {
  return (
    <div className={`pricing-card${highlighted ? ' pricing-card--highlighted' : ''}`}>
      <h3>{plan}</h3>
      <p className="pricing-card__price">{price}</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <i className="fas fa-check" /> {feature}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onSelect}>
        Get Started
      </button>
    </div>
  );
}
