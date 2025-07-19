// The about component displays information about the model.
const About = () => {
  return (
    <section className="py-40" id="about">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div className="max-w-2xl">
          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70" data-en="About Me" data-uz="Men Haqida" data-ru="Обо мне">
            About Me
          </h3>
          <p className="text-lg leading-relaxed" data-en="A passionate international model based in the vibrant city of Tashkent, specializing in editorial and high-fashion photography. With a unique ability to transform concepts into compelling visual narratives, I bring stories to life through the lens. My work transcends traditional modeling – it's about creating art, evoking emotions, and capturing the essence of fashion's most innovative moments. From haute couture to avant-garde editorials, I collaborate with visionary photographers and designers to push creative boundaries and deliver unforgettable imagery that resonates with audiences worldwide." data-uz="Toshkent shahrida istiqomat qiluvchi ishtiyoqmand xalqaro model, editorial va yuqori moda fotosuratlariga ixtisoslashgan. Kontseptsiyalarni jozibali vizual hikoyalarga aylantirishning noyob qobiliyati bilan men ob'ektiv orqali hikoyalarni jonlantirib beraman. Mening ishim an'anaviy modellikdan tashqari - bu san'at yaratish, his-tuyg'ularni uyg'otish va modaning eng innovatsion lahzalari mohiyatini qo'lga kiritish haqida. Haute couture'dan avangard editoriallargacha, men vizioner fotograflar va dizaynerlar bilan hamkorlik qilib, ijodiy chegaralarni kengaytirish va dunyo bo'ylab tomoshabinlarni hayratda qoldiruvchi unutilmas tasvirlarni yaratish uchun ishlayman." data-ru="Страстная международная модель из яркого города Ташкента, специализирующаяся на эдиториал и high-fashion фотографии. Обладая уникальной способностью превращать концепции в захватывающие визуальные нарративы, я оживляю истории через объектив. Моя работа выходит за рамки традиционного моделинга — это создание искусства, пробуждение эмоций и захват сути самых инновационных моментов моды. От haute couture до авангардных эдиториалов, я сотрудничаю с визионерскими фотографами и дизайнерами, чтобы раздвигать творческие границы и создавать незабываемые образы, которые находят отклик у аудитории по всему миру.">
            A passionate international model based in the vibrant city of Tashkent, specializing in editorial and high-fashion photography. With a unique ability to transform concepts into compelling visual narratives, I bring stories to life through the lens. My work transcends traditional modeling – it's about creating art, evoking emotions, and capturing the essence of fashion's most innovative moments. From haute couture to avant-garde editorials, I collaborate with visionary photographers and designers to push creative boundaries and deliver unforgettable imagery that resonates with audiences worldwide.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4" data-en="Measurements" data-uz="O'lchamlar" data-ru="Параметры">
              Measurements
            </h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-surface-light">
                  <td className="py-3 font-bold text-accent" data-en="Height" data-uz="Bo'y" data-ru="Рост">
                    Height
                  </td>
                  <td className="py-3 text-right">166 cm</td>
                </tr>
                <tr className="border-b border-surface-light">
                  <td className="py-3 font-bold text-accent" data-en="Chest" data-uz="Ko'krak" data-ru="Грудь">
                    Chest
                  </td>
                  <td className="py-3 text-right">66 cm</td>
                </tr>
                <tr className="border-b border-surface-light">
                  <td className="py-3 font-bold text-accent" data-en="Waist" data-uz="Bel" data-ru="Талия">
                    Waist
                  </td>
                  <td className="py-3 text-right">60 cm</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-accent" data-en="Hips" data-uz="Sonlar" data-ru="Бедра">
                    Hips
                  </td>
                  <td className="py-3 text-right">64 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4" data-en="Languages" data-uz="Tillar" data-ru="Языки">
              Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2 bg-surface rounded-full text-sm">English</span>
              <span className="px-5 py-2 bg-surface rounded-full text-sm">Русский</span>
              <span className="px-5 py-2 bg-surface rounded-full text-sm">O'zbek</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
