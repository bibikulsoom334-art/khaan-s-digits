
const cards = [
  {
    title: "Birthday Wishes",
    category: "BIRTHDAY",
    description: "Make their special day unforgettable.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    occasion: "birthday",
  },
  {
    title: "Anniversary Wishes",
    category: "ANNIVERSARY",
    description: "Celebrate love and beautiful memories.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    occasion: "anniversary",
  },
  {
    title: "Love & Romance",
    category: "LOVE",
    description: "Send a message straight from the heart.",
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800",
    occasion: "love",
  },
  {
    title: "Eid Mubarak",
    category: "EID",
    description: "Share happiness with your loved ones.",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800",
    occasion: "eid",
  },
  {
    title: "Wedding Wishes",
    category: "WEDDING",
    description: "Celebrate a beautiful new beginning.",
    image:
      "https://images.unsplash.com/photo-1519225421980-888cb7e38c15?w=800",
    occasion: "wedding",
  },
  {
    title: "Congratulations",
    category: "CELEBRATION",
    description: "Make every achievement memorable.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    occasion: "congratulations",
  },
];

export default function WishesGallery() {
  return (
    <section className="wishes-section" id="occasions">
      <div className="wishes-heading">
        <span className="wishes-label">
          ✦ MADE FOR YOUR MOMENTS
        </span>

        <h2>
          Wishes That Feel
          <span> Extraordinary.</span>
        </h2>

        <p>
          Beautiful digital greeting cards, crafted to
          make every special moment unforgettable.
        </p>
      </div>

      <div className="wishes-grid">
        {cards.map((card) => (
          <article className="wish-card" key={card.occasion}>
            <div className="wish-image">
              <img src={card.image} alt={card.title} />
              <span className="wish-tag">{card.category}</span>
            </div>

            <div className="wish-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>

              <a
                href={`/order?occasion=${card.occasion}`}
                className="wish-button"
              >
                Create Your Card <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .wishes-section {
          padding: 100px 5%;
          background: #050a08;
          color: white;
        }

        .wishes-heading {
          max-width: 700px;
          margin: 0 auto 55px;
          text-align: center;
        }

        .wishes-label {
          color: #00e89a;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 700;
        }

        .wishes-heading h2 {
          font-size: clamp(34px, 5vw, 58px);
          margin: 20px 0;
          letter-spacing: -2px;
        }

        .wishes-heading h2 span {
          color: #00e89a;
        }

        .wishes-heading p {
          color: #a4b3ac;
          line-height: 1.8;
        }

        .wishes-grid {
          max-width: 1250px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 25px;
        }

        .wish-card {
          background: #0b1510;
          border: 1px solid #1b3528;
          border-radius: 18px;
          overflow: hidden;
          transition: 0.3s ease;
        }

        .wish-card:hover {
          transform: translateY(-8px);
          border-color: #00e89a;
          box-shadow: 0 15px 45px #00e89a18;
        }

        .wish-image {
          height: 230px;
          position: relative;
          overflow: hidden;
        }

        .wish-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .wish-card:hover .wish-image img {
          transform: scale(1.07);
        }

        .wish-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #06150dcc;
          color: #00e89a;
          padding: 8px 12px;
          border-radius: 30px;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .wish-content {
          padding: 23px;
        }

        .wish-content h3 {
          font-size: 21px;
          margin: 0 0 10px;
        }

        .wish-content p {
          color: #9baaa2;
          font-size: 14px;
          line-height: 1.7;
          min-height: 45px;
        }

        .wish-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 22px;
          padding: 13px 16px;
          border: 1px solid #236342;
          border-radius: 9px;
          color: #00e89a;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
        }

        .wish-button:hover {
          background: #00e89a;
          color: #031009;
        }

        @media (max-width: 850px) {
          .wishes-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 550px) {
          .wishes-section {
            padding: 70px 5%;
          }

          .wishes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
