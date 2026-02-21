'use client';

import Link from 'next/link';

export default function BoxingClubPremium() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff', overflow: 'hidden' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        borderBottom: '1px solid rgba(255, 107, 107, 0.2)',
        padding: '1.5rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: '700' }}>
            ← Portfolio
          </Link>
          <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Boxing Club Premium</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        position: 'relative',
        marginTop: '60px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '900px', padding: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 107, 107, 0.2)',
              border: '1px solid rgba(255, 107, 107, 0.5)',
              color: '#ff6b6b',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '2rem'
            }}>BOXING CLUB PREMIUM</span>
          </div>
          <h1 style={{
            fontSize: '4.5rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #ff6b6b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Entrainez-vous<br/>comme les champions
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#aaa',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Rejoignez notre communauté de boxeurs passionnés. Entraînement professionnel, équipement premium et coaching expert pour tous les niveaux.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              backgroundColor: '#ff6b6b',
              color: '#fff',
              padding: '1rem 2.5rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5252'} onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b6b'}>
              Commencer gratuitement
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#fff',
              padding: '1rem 2.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => { e.target.style.borderColor = '#ff6b6b'; e.target.style.color = '#ff6b6b'; }} onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.target.style.color = '#fff'; }}>
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '4rem',
          color: '#fff'
        }}>
          Nos Services
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { title: 'Coaching Professionnel', desc: 'Entraîneurs certifiés avec expérience internationale', icon: '🥊' },
            { title: 'Équipement Premium', desc: 'Ring professionnel, sacs, gants et accessoires haut de gamme', icon: '⚙️' },
            { title: 'Programmes Personnalisés', desc: 'Plans d\'entraînement adaptés à votre niveau et vos objectifs', icon: '📋' },
            { title: 'Cours en Groupe', desc: 'Sessions dynamiques et motivantes pour tous les niveaux', icon: '👥' },
            { title: 'Compétitions', desc: 'Participez à nos championnats internes et externes', icon: '🏆' },
            { title: 'Accès 24/7', desc: 'Entraînez-vous quand vous le souhaitez avec accès illimité', icon: '🕐' }
          ].map((service, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              borderRadius: '12px',
              padding: '2rem',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 107, 107, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: '600' }}>{service.title}</h3>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: 'rgba(255, 107, 107, 0.05)',
        borderTop: '1px solid rgba(255, 107, 107, 0.2)',
        borderBottom: '1px solid rgba(255, 107, 107, 0.2)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '4rem',
            color: '#fff'
          }}>
            Tarifs Compétitifs
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { name: 'Découverte', price: '29€', period: '/mois', features: ['Accès pendant 1 mois', '3 séances par semaine', 'Coaching basique'] },
              { name: 'Premium', price: '79€', period: '/mois', features: ['Accès illimité', 'Coaching personnalisé', 'Programme adapté', 'Accès 24/7'], highlight: true },
              { name: 'Champion', price: '149€', period: '/mois', features: ['Tout du Premium', 'Nutrition consultations', 'Compétitions incluses', 'Coaching VIP'] }
            ].map((plan, i) => (
              <div key={i} style={{
                backgroundColor: plan.highlight ? 'linear-gradient(135deg, #ff6b6b 0%, #ff8a80 100%)' : 'rgba(255, 255, 255, 0.05)',
                border: plan.highlight ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '2.5rem',
                position: 'relative',
                transform: plan.highlight ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s'
              }}>
                {plan.highlight && <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#fff',
                  color: '#ff6b6b',
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}>POPULAIRE</div>}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>{plan.name}</h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '700' }}>{plan.price}</span>
                  <span style={{ color: plan.highlight ? 'rgba(255, 255, 255, 0.8)' : '#aaa' }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{
                      padding: '0.75rem 0',
                      borderBottom: '1px solid ' + (plan.highlight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'),
                      color: plan.highlight ? '#fff' : '#ccc'
                    }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: '100%',
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: plan.highlight ? '#fff' : '#ff6b6b',
                  color: plan.highlight ? '#ff6b6b' : '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }} onMouseEnter={(e) => e.target.style.opacity = '0.9'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  S'inscrire maintenant
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#fff'
        }}>
          Prêt à commencer votre parcours ?
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#aaa',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Rejoignez des centaines de boxeurs qui transforment leur vie et atteignent leurs objectifs avec nous.
        </p>
        <button style={{
          backgroundColor: '#ff6b6b',
          color: '#fff',
          padding: '1.25rem 3rem',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5252'} onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b6b'}>
          Obtenir l'accès maintenant
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: '#666'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ marginBottom: '1rem' }}>© 2025 Boxing Club Premium. Tous droits réservés.</p>
          <div style={{ fontSize: '0.9rem', color: '#555' }}>
            Fait avec ❤️ par Matteo Taubin · <Link href="/" style={{ color: '#ff6b6b', textDecoration: 'none' }}>Retour au portfolio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
