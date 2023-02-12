import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import style from "../../styles/about.module.css"

const About = () => (
  <>
  <Navbar/>
  <div className={style.container}>
    <div className={style.containerimagenfondo}>
    <img src="/quienes-somos-fondo.jpg" alt="Image" className={style.imagenfondo} />
    </div>
    <div className={style.containetext}>
    <h1 className={style.texth1}>¿Quienes Somos?</h1>
    <p className={style.textp}>Creativos Pariona es una empresa dedicada a la creación de logotipos, diseño gráfico y personalización de productos. Fundada por Jorge Luis Pariona Vivanco en el año 2013, la empresa ha evolucionado y se ha especializado en estampados de polos, creación de logos, personalización de motocicletas y calendarios. En el año 2016, se estableció el nombre de la empresa y en el 2019, se expandió con la adquisición de maquinaria y la contratación de profesionales para brindar servicios a empresas de diferentes rubros. Con un equipo altamente capacitado, Creativos Pariona se ha destacado por ofrecer servicios de alta calidad y eficiencia.</p>
    </div>
  </div>
  <Footer/>
  </>
);

export default About;
