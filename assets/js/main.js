/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Jun 27 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


 /**
   * Form Validation
   */

 var nameError=document.getElementById('name-error');
 var emailError=document.getElementById('email-error');
 var contactError=document.getElementById('contact-error');
 var messageError=document.getElementById('message-error');
 var submitError=document.getElementById('submit-error');

 function validateName(){
    var name = document.getElementById('name').value;
    
    if(name.length == 0){
      nameError.innerHTML='Enter valid Name';
      return false;
    }
    
    if(!name.match(/^[A-Za-z]+ [A-Za-z]+$/)){
      nameError.innerHTML = 'Enter Full Name';
      return false;
    }
    nameError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C"><path d="m337-40-80-135-154-34 15-155L16-480l102-116-15-155 154-34 80-135 143 62 143-62 80 135 154 34-15 155 102 116-102 116 15 155-154 34-80 135-143-62-143 62Zm46-143 97-42 97 42 55-91 102-23-8-105 68-78-68-78 8-105-102-23-55-91-97 42-97-42-55 91-102 22 8 106-68 78 69 78-9 106 102 23 55 90Zm97-297Zm-50 150 243-242-60-57-183 182-83-85-60 60 143 142Z"/></svg>'
    return true;
 }


 function validateEmail(){
  var email=document.getElementById('email').value;

    if(email.length==0){
      emailError.innerHTML='Enter Valid Email';
      return false;
    }

    if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
      emailError.innerHTML='Email Invalid';
      return false;
    }
    emailError.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C"><path d="m337-40-80-135-154-34 15-155L16-480l102-116-15-155 154-34 80-135 143 62 143-62 80 135 154 34-15 155 102 116-102 116 15 155-154 34-80 135-143-62-143 62Zm46-143 97-42 97 42 55-91 102-23-8-105 68-78-68-78 8-105-102-23-55-91-97 42-97-42-55 91-102 22 8 106-68 78 69 78-9 106 102 23 55 90Zm97-297Zm-50 150 243-242-60-57-183 182-83-85-60 60 143 142Z"/></svg>';
    return true;
 }


  function validateNumber(){
      var contact = document.getElementById('contact-number').value;


          if(contact.length == 0 ){
              contactError.innerHTML='Enter Contact Number';
              return false;
          }
          if(contact.length !==10 ){
            contactError.innerHTML='Enter 10 digit Contact Number';
            return false;
          }
          if(!contact.match(/^[0-9]{10}$/)){
            contactError.innerHTML='Only Digits';
            return false;

          }
        
          contactError.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C"><path d="m337-40-80-135-154-34 15-155L16-480l102-116-15-155 154-34 80-135 143 62 143-62 80 135 154 34-15 155 102 116-102 116 15 155-154 34-80 135-143-62-143 62Zm46-143 97-42 97 42 55-91 102-23-8-105 68-78-68-78 8-105-102-23-55-91-97 42-97-42-55 91-102 22 8 106-68 78 69 78-9 106 102 23 55 90Zm97-297Zm-50 150 243-242-60-57-183 182-83-85-60 60 143 142Z"/></svg>';
          return true;

  }

  function validateMessage(){
    var message=document.getElementById('message').value;
    var required=10;
    var left=required-message.length;

    if(left>0){
      messageError.innerHTML=left+ ' More Characters Required';
      return false;
    }
    messageError.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#75FB4C"><path d="m337-40-80-135-154-34 15-155L16-480l102-116-15-155 154-34 80-135 143 62 143-62 80 135 154 34-15 155 102 116-102 116 15 155-154 34-80 135-143-62-143 62Zm46-143 97-42 97 42 55-91 102-23-8-105 68-78-68-78 8-105-102-23-55-91-97 42-97-42-55 91-102 22 8 106-68 78 69 78-9 106 102 23 55 90Zm97-297Zm-50 150 243-242-60-57-183 182-83-85-60 60 143 142Z"/></svg>';
    return true;
  }

  function validateForm(){
    if(!validateName() || !validateEmail() || !validateNumber() || !validateMessage()){
      submitError.style.display='block';
      submitError.innerHTML='Please Fix Error To Submit';
      setTimeout(function(){submitError.style.display='none';},3000);
      return false;
    }
    

  }