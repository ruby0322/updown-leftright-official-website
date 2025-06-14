import TeacherCard from "./teacher-card";

export default function TeacherSection() {
  const teachers = [
    {
      name: "小卡老師",
      title: "專業兒童美術教師",
      description: "我是小卡老師，擁有五年兒童美術教學經驗，熱愛啟發孩子的創造力。相信每個孩子都是天生的藝術家，只需要適當的引導和鼓勵。我的教學理念是讓孩子在快樂中學習，在創作中成長。",
      imageSrc: "/images/xiao-ca.jpg",
      education: [
        "復興美工 美術科 畢業",
        "文化大學 美術系 二年級 在學中"
      ],
      instagramLinks: [
        {
          username: "upanddown.leftandright_",
          url: "https://www.instagram.com/upanddown.leftandright_"
        },
        {
          username: "carolineee_o4o1_b",
          url: "https://www.instagram.com/carolineee_o4o1_b"
        }
      ]
    },
    {
      name: "Ruby 醬",
      title: "課堂助教 / 攝影師",
      description: "我是 Ruby，擔任課堂助教的同時也是一名攝影師。除了協助老師照顧孩子的學習需求，也負責記錄孩子們在課堂上的精彩時刻。期待能和孩子們一起探索藝術的奧妙，留下珍貴的成長回憶。",
      imageSrc: "/images/ruby.jpeg",
      education: [
        "國立台灣大學 資管系 畢業",
        "國立台灣大學 攝影社"
      ],
      instagramLinks: [
        {
          username: "ruby.0322",
          url: "https://www.instagram.com/ruby.0322"
        }
      ]
    },
    {
      name: "呆呆",
      title: "校犬 / 厭世大師",
      description: "汪。我是呆呆，這裡最不想當校犬的校犬。每天只想窩在我的沙發上睡覺，但總是被小卡老師吵醒。偶爾勉強讓你們摸一下，但別摸太久，我很忙的。",
      imageSrc: "/images/daidai.jpg",
      education: [
        "畢業於高級犬舍大學",
        "專精於無視人類"
      ],
      instagramLinks: [
        {
          username: "不是我的帳號但偶爾會出現",
          url: "https://www.instagram.com/kafyiou0401"
        }
      ]
    }
  ];

  return (
    <section id="teacher" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">師資陣容</h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <TeacherCard key={index} {...teacher} />
          ))}
        </div>
      </div>
    </section>
  );
} 