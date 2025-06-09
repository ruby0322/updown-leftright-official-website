import Image from "next/image";
import data from "../data.json";

export default function Footer() {
  const { companyInfo, contactInfo, scheduleInfo, copyright } = data;

  return (
    <footer className="bg-brand-primary-400 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Image 
                  src={companyInfo.logo.src} 
                  alt={companyInfo.logo.alt} 
                  width={companyInfo.logo.width} 
                  height={companyInfo.logo.height} 
                />
              </div>
              <h5 className="text-xl font-bold">{companyInfo.name}</h5>
            </div>
            <p className="">{companyInfo.description}</p>
          </div>
          <div>
            <h6 className="font-semibold mb-4">聯絡資訊</h6>
            <div className="space-y-2 ">
              <p>📍 {contactInfo.address}</p>
              <p>📞 {contactInfo.phone}</p>
              <p>✉️ {contactInfo.email}</p>
            </div>
          </div>
          <div>
            <h6 className="font-semibold mb-4">上課時間</h6>
            <div className="space-y-2 ">
              <p>週六 {scheduleInfo.saturday}</p>
              <p>週日 {scheduleInfo.sunday}</p>
              <p>{scheduleInfo.note}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-primary-500 mt-8 pt-8 text-center">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
} 