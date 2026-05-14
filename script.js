/*Nombre: Juliana Volveras Amaya */
/*Grupo: 213025_14 */
/*Curso: Programación web */
 
/* =========================================
   MENSAJE DE BIENVENIDA SEGÚN HORA DEL DÍA
   ========================================= */
 
function mostrarMensajeBienvenida() {
  const hora = new Date().getHours();
  let mensaje = '';
  let mensajeEn = '';
  let mensajeKo = '';
  let icono = '';
 
  if (hora >= 5 && hora < 12) {
    mensaje   = '¡Buenos días! Bienvenido a Ecos de la Arquitectura Coreana';
    mensajeEn = 'Good morning! Welcome to Echoes of Korean Architecture';
    mensajeKo = '좋은 아침이에요! 한국 건축의 메아리에 오신 것을 환영합니다';
    icono = '🌅';
  } else if (hora >= 12 && hora < 18) {
    mensaje   = '¡Buenas tardes! Bienvenido a Ecos de la Arquitectura Coreana';
    mensajeEn = 'Good afternoon! Welcome to Echoes of Korean Architecture';
    mensajeKo = '안녕하세요! 한국 건축의 메아리’에 오신 것을 환영합니다';
    icono = '☀️';
  } else {
    mensaje   = '¡Buenas noches! Bienvenido a Ecos de la Arquitectura Coreana';
    mensajeEn = 'Good evening! Welcome to Echoes of Korean Architecture';
    mensajeKo = '좋은 밤입니다! 한국 건축의 메아리’에 오신 것을 환영합니다';
    icono = '🌙';
  }
 
  // Crear el elemento del mensaje en el DOM
  const bienvenida = document.createElement('div');
  bienvenida.id = 'mensaje-bienvenida';
  bienvenida.innerHTML = `
    <div class="bienvenida-contenido">
      <span class="bienvenida-icono">${icono}</span>
      <div class="bienvenida-textos">
        <p class="bienvenida-es">${mensaje}</p>
        <p class="bienvenida-en">${mensajeEn}</p>
        <p class="bienvenida-ko">${mensajeKo}</p>
      </div>
      <button class="bienvenida-cerrar" onclick="cerrarBienvenida()" aria-label="Cerrar mensaje de bienvenida">✕</button>
    </div>
  `;
 
  document.body.prepend(bienvenida);
 
  // Cierre automático después de 8 segundos
  setTimeout(cerrarBienvenida, 8000);
}
 
function cerrarBienvenida() {
  const msg = document.getElementById('mensaje-bienvenida');
  if (msg) {
    msg.style.animation = 'slideUp 0.4s ease forwards';
    setTimeout(() => msg.remove(), 400);
  }
}
 
/* =========================================
   MENÚ DESPLEGABLE
   ========================================= */
 
function iniciarMenuDesplegable() {
  const nav = document.querySelector('.nav-principal');
  if (!nav) return;
 
  // Definir submenús para cada sección
  const submenus = {
    'palacios.html': [
      { texto: 'Gyeongbokgung', url: 'palacios.html#gyeongbokgung' },
      { texto: 'Changdeokgung', url: 'palacios.html#changdeokgung' },
      { texto: 'Deoksugung',    url: 'palacios.html#deoksugung' }
    ],
    'templos.html': [
      { texto: 'Bulguksa', url: 'templos.html#bulguksa' },
      { texto: 'Jogyesa',  url: 'templos.html#jogyesa' },
      { texto: 'Haeinsa',  url: 'templos.html#haeinsa' }
    ],
    'hanok.html': [
      { texto: 'Diseño y Materiales', url: 'hanok.html#titulo-caract-hanok' },
      { texto: 'Sistema Ondol',       url: 'hanok.html#titulo-ondol' }
    ],
    'dancheong.html': [
      { texto: 'Los Cinco Colores', url: 'dancheong.html#titulo-paleta' },
      { texto: 'Técnica y Aplicación', url: 'dancheong.html#titulo-tecnica' }
    ]
  };
 
  const enlaces = nav.querySelectorAll('a');
 
  enlaces.forEach(enlace => {
    const href = enlace.getAttribute('href');
    if (!submenus[href]) return;
 
    // Crear contenedor con submenú
    const contenedor = document.createElement('div');
    contenedor.className = 'nav-item-contenedor';
 
    enlace.parentNode.insertBefore(contenedor, enlace);
    contenedor.appendChild(enlace);
 
    const submenu = document.createElement('div');
    submenu.className = 'submenu';
    submenu.setAttribute('role', 'menu');
 
    submenus[href].forEach(item => {
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.texto;
      link.setAttribute('role', 'menuitem');
      submenu.appendChild(link);
    });
 
    contenedor.appendChild(submenu);
 
    // Eventos mouseover y mouseout
    contenedor.addEventListener('mouseover', () => {
      submenu.classList.add('visible');
    });
 
    contenedor.addEventListener('mouseout', (e) => {
      if (!contenedor.contains(e.relatedTarget)) {
        submenu.classList.remove('visible');
      }
    });
 
    // Accesibilidad: también con foco de teclado
    enlace.addEventListener('focus', () => submenu.classList.add('visible'));
    contenedor.addEventListener('focusout', (e) => {
      if (!contenedor.contains(e.relatedTarget)) {
        submenu.classList.remove('visible');
      }
    });
  });
}
 
/* =========================================
   SLIDER DE IMÁGENES
   ========================================= */
 
function iniciarSlider() {
  const slider = document.getElementById('slider-principal');
  if (!slider) return;
 
  const imagenes = slider.querySelectorAll('.slide');
  const total = imagenes.length;
  let actual = 0;
  let intervalo;
 
  function mostrarSlide(indice) {
    imagenes.forEach(img => img.classList.remove('activo'));
    const puntos = slider.querySelectorAll('.punto');
    puntos.forEach(p => p.classList.remove('activo'));
 
    imagenes[indice].classList.add('activo');
    if (puntos[indice]) puntos[indice].classList.add('activo');
    actual = indice;
  }
 
  function siguiente() {
    const nuevoIndice = (actual + 1) % total;
    mostrarSlide(nuevoIndice);
  }
 
  function anterior() {
    const nuevoIndice = (actual - 1 + total) % total;
    mostrarSlide(nuevoIndice);
  }
 
  function iniciarIntervalo() {
    intervalo = setInterval(siguiente, 4000);
  }
 
  function detenerIntervalo() {
    clearInterval(intervalo);
  }
 
  // Botones de navegación
  const btnSig = slider.querySelector('.slider-siguiente');
  const btnAnt = slider.querySelector('.slider-anterior');
 
  if (btnSig) {
    btnSig.addEventListener('click', () => {
      siguiente();
      detenerIntervalo();
      iniciarIntervalo();
    });
  }
 
  if (btnAnt) {
    btnAnt.addEventListener('click', () => {
      anterior();
      detenerIntervalo();
      iniciarIntervalo();
    });
  }
 
  // Puntos de navegación
  const puntos = slider.querySelectorAll('.punto');
  puntos.forEach((punto, i) => {
    punto.addEventListener('click', () => {
      mostrarSlide(i);
      detenerIntervalo();
      iniciarIntervalo();
    });
  });
 
  // Pausa al pasar el mouse
  slider.addEventListener('mouseover', detenerIntervalo);
  slider.addEventListener('mouseout', iniciarIntervalo);
 
  // Iniciar
  mostrarSlide(0);
  iniciarIntervalo();
}
 
/* =========================================
   INICIALIZAR TODO AL CARGAR LA PÁGINA
   ========================================= */
 
document.addEventListener('DOMContentLoaded', () => {
  mostrarMensajeBienvenida();
  iniciarMenuDesplegable();
  iniciarSlider();
});