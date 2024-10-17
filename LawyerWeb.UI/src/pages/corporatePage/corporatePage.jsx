import React from 'react';
import PageHeader from '../../components/pageHeader/page-header';
import './corporatePage.css';

const CorporatePage = () => {
    return (
        <>
            <PageHeader title="KVKK Aydınlatma Metni" />
            <div className="kvkk-container">
                <h2>1. Veri Sorumlusu ve Temsilcisi</h2>
                <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz veri sorumlusu olarak Lawyer Web tarafından aşağıda açıklanan kapsamda işlenebilecektir.</p>

                <h2>2. Kişisel Verilerin Hangi Amaçla İşleneceği</h2>
                <p>Kişisel verileriniz, Lawyer Web tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimleri tarafından yapılması, Lawyer Web tarafından sunulan ürün ve hizmetlerin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi, Lawyer Web ve Lawyer Web ile iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini, Lawyer Web’nın ticari ve iş stratejilerinin belirlenmesi ve uygulanması ve Lawyer Web’nın insan kaynakları politikalarının yürütülmesinin temini amaçlarıyla KVKK’nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir.</p>

                <h2>3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
                <p>Toplanan kişisel verileriniz; Lawyer Web’nın iş ortaklarına, Lawyer Web’nın tedarikçilerine, Lawyer Web’nın iştiraklerine, hukuken yetkili kamu kurum ve kuruluşlarına ve hukuken yetkili özel hukuk tüzel kişilerine, KVKK’nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.</p>

                <h2>4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
                <p>Kişisel verileriniz Lawyer Web tarafından farklı kanallardan ve farklı hukuki sebeplere dayanarak toplanmaktadır. Bu hukuki sebepler doğrultusunda toplanan kişisel verileriniz KVKK’nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında bu metnin 2. ve 3. maddelerinde belirtilen amaçlarla işlenebilmekte ve aktarılabilmektedir.</p>

                <h2>5. Kişisel Veri Sahibinin KVKK’nın 11. Maddesinde Sayılan Hakları</h2>
                <p>Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi işbu Aydınlatma Metni’nde aşağıda belirtilen yöntemlerle Lawyer Web’na iletmeniz durumunda Lawyer Web talebin niteliğine göre talebi en geç otuz gün içinde ücretsiz olarak sonuçlandıracaktır. Ancak, işlemin ayrıca bir maliyeti gerektirmesi hâlinde, Lawyer Web tarafından Kişisel Verileri Koruma Kurulu’nca belirlenen tarifedeki ücret alınacaktır.</p>
                <ul>
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                    <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
                    <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                    <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,</li>
                    <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                    <li>KVKK ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerinizin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                    <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                    <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
                </ul>
                <p>Yukarıda belirtilen haklarınızı kullanmak için Lawyer Web’e yazılı olarak başvurabilirsiniz.</p>
            </div>
        </>
    );
};

export default CorporatePage;
