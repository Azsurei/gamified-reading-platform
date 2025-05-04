const TiendaPage = () => {
  return (
    <div className="max-w-[1050px] mx-auto px-8 pb-12">
      <div className="flex flex-col items-center mb-6 gap-4">
        <img
          src={"/tienda.svg"}
          alt={"Tienda"}
          className="w-[90px] h-[90px] rounded-lg object-cover"
        />
        <h1 className="lg:text-[40px] font-bold text-gray-800 text-center text-2xl md:text-[30px]">
          Tienda
        </h1>
        <p className="text-md text-gray-500 font-semibold text-center">
          Gasta tus puntos de experiencia en útiles comodines
        </p>
      </div>
    </div>
  );
};

export default TiendaPage;
