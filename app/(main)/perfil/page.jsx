"use client";

const userData = {
  username: "Bruce Estrada Melgarejo",
  registeredDate: "15 de febrero de 2025",
  avatar: "/avatar1.svg",
  stats: [
    { icon: "/books.svg", value: 10, label: "N° de lecturas leídas" },
    { icon: "/xp.svg", value: "234 XP", label: "Experiencia total conseguida" },
    { icon: "/trophy.svg", value: 1, label: "N° de veces en el top 3" },
    { icon: "/streak.svg", value: 0, label: "días de racha" },
  ],
  badges: ["/book-badge.svg", "/score-badge.svg", "/science-badge.svg"],
};

const PerfilPage = () => {
  return (
    <div>
      <div className="max-w-[1050px] mx-auto px-8 pb-12 flex flex-col items-center gap-6 sm:gap-12">
        {/* Perfil */}
        <div className="flex flex-col items-center gap-4 w-full">
          <img
            src={userData.avatar}
            alt="userProfile"
            className="w-[90px] h-[90px] lg:w-[160px] lg:h-[160px] rounded-lg object-cover"
          />
          <h1 className="lg:text-[40px] font-bold text-negro text-center text-2xl md:text-[30px]">
            {userData.username}
          </h1>
          <p className="text-md text-gray-500 font-semibold text-center">
            Registrado el {userData.registeredDate}
          </p>
        </div>

        {/* Estadísticas */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {userData.stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-300"
              >
                <img src={stat.icon} alt="icon" className="w-10 h-10" />
                <div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insignias */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Insignias</h2>
          <div className="flex gap-8 items-center rounded-xl border border-gris overflow-auto p-4">
            {userData.badges.map((badge, index) => (
              <img
                key={index}
                src={badge}
                alt={`badge-${index}`}
                className="w-[50px] h-[50px]"
              />
            ))}
          </div>
        </div>

        {/* Gráficos (encabezado) */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Gráficos</h2>
          {/* Aquí agregarás tus componentes de gráficos luego */}
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
