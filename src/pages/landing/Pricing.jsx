import { useNavigate } from 'react-router-dom';
import { IoCheckmarkCircle } from 'react-icons/io5';
import './Pricing.css';

const packages = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    desc: 'Perfect for getting started with a single branch.',
    features: [
      '1 Branch',
      'Up to 50 orders/month',
      'Basic dashboard',
      'SMS notifications (limited)',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 'KES 2,500',
    period: '/month',
    desc: 'For growing laundry businesses with multiple branches.',
    features: [
      'Up to 5 Branches',
      'Unlimited orders',
      'Advanced analytics',
      'Payment integration (Pesapal)',
      'SMS notifications',
      'Priority support',
      'Staff management',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'KES 7,500',
    period: '/month',
    desc: 'For large operations with custom requirements.',
    features: [
      'Unlimited Branches',
      'Unlimited orders',
      'Full analytics suite',
      'All payment integrations',
      'Unlimited SMS',
      'Dedicated account manager',
      'Custom branding',
      'API access',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="container text-center">
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the plan that fits your laundry business. Upgrade anytime.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pricing-grid">
            {packages.map((pkg, i) => (
              <div className={`pricing-card card ${pkg.highlighted ? 'highlighted' : ''}`} key={i}>
                {pkg.highlighted && <span className="pricing-badge">Most Popular</span>}
                <h3>{pkg.name}</h3>
                <div className="pricing-price">
                  <span className="price">{pkg.price}</span>
                  <span className="period">{pkg.period}</span>
                </div>
                <p className="pricing-desc">{pkg.desc}</p>
                <ul className="pricing-features">
                  {pkg.features.map((f, j) => (
                    <li key={j}>
                      <IoCheckmarkCircle className="check-icon" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn w-full ${pkg.highlighted ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => navigate('/register')}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
