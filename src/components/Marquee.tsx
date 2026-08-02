
interface MarqueeProps {
  direction?: 'left' | 'right';
}

export default function Marquee({ direction = 'left' }: MarqueeProps) {
  const text = "Web Development \u2022 Databases \u2022 Nodejs \u2022 REST APIs \u2022 React Native \u2022 Vector Databases \u2022 Model Fine-tuning \u2022 Mobile App Development \u2022 Full Stack Development \u2022 UI/UX Design \u2022 ";

  const isReversed = direction === 'right';

  return (
    <section className={`section is--marquee relative overflow-hidden bg-black ${isReversed ? 'is--reversed-marquee' : ''}`}>
      <div className="marquee--wrapper relative z-10">
        {isReversed ? (
          <>
            <div className="marquee--archwrapper-left-reversed">
              <img src="/nether-portal-nobg.png" className="marquee--archwrapper-img" alt="Arch Left" />
            </div>
            <div className="marquee--archwrapper-right-reversed">
              <img src="/nether-portal-nobg.png" className="marquee--archwrapper-img" alt="Arch Right" />
            </div>
          </>
        ) : (
          <>
            <div className="marquee--archwrapper-left">
              <img src="/nether-portal-nobg.png" className="marquee--archwrapper-img" alt="Arch Left" />
            </div>
            <div className="marquee--archwrapper-right">
              <img src="/nether-portal-nobg.png" className="marquee--archwrapper-img" alt="Arch Right" />
            </div>
          </>
        )}

        <div className="marquee--textwrapper">
          <div className="marquee--textwrapper-hold">
            <p className="marquee--text">{text}</p>
            <p className="marquee--text">{text}</p>
          </div>
        </div>

        <div className="marquee--textwrapper is--second">
          <div className="marquee--textwrapper-hold reverse">
            <p className="marquee--text">{text}</p>
            <p className="marquee--text">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

