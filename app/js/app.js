document.addEventListener("DOMContentLoaded", function() {

	//----------------------Fancybox-----------------------
		Fancybox.bind("[data-fancybox]", {});

	//----------------------SLIDER-hero----------------------
		var mySwiper = new Swiper('.hero__slider', {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			effect: 'fade',
			autoplay: {
				delay: 5100,
			},
		});

	//----------------------SLIDER-about----------------------
		var mySwiper = new Swiper('.about__slider', {
			spaceBetween: 15,
			loop: true,
			speed: 9000,
			autoplay: {
				delay: 0,
			},
			freeMode: true,
			freeModeMomentum: false,
			slidesPerView: 1.35,
			breakpoints: {
				480: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				767: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 40
				},
				1200: {
					slidesPerView: 4,
					spaceBetween: 40
				}
			}
		});

	//----------------------SLIDER-wrapper----------------------
		let swiperInstance = null;

		function initSwiper() {
			const screenWidth = window.innerWidth;

			if (screenWidth >= 992 && !swiperInstance) {
				swiperInstance = new Swiper('.wrapper', {
					direction: 'vertical',
					slidesPerView: 1,
					simulateTouch: false,
					speed: 1200,
					initialSlide: 0,
					mousewheel: {
						releaseOnEdges: false,
					},
					pagination: {
						el: '.swiper-pagination',
						type: 'progressbar',
					},
					on: {
						init() {
							setupScrollBlocking();
						},
						slideChange() {
							setupScrollBlocking();
							updateSlideMenu(swiperInstance); // додаємо оновлення меню
							updateSlideFooterMenu(swiperInstance); // додаємо оновлення меню
						},
					},
				});
				setupMenuListeners(swiperInstance);
				setupMenuFooterListeners(swiperInstance);
			} else if (screenWidth < 992 && swiperInstance) {
				swiperInstance.destroy(false, true);
				swiperInstance = null;
			}
		}

		window.addEventListener('load', initSwiper);
		window.addEventListener('resize', initSwiper);

	// ---------------------- scroll blocking ----------------------
		function setupScrollBlocking() {
			const scrollable = document.querySelectorAll('.scrollable-content');

			scrollable.forEach(el => {
				el.addEventListener('wheel', function (e) {
					const delta = e.deltaY;
					const atTop = el.scrollTop === 0;
					const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

					if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
						e.stopPropagation();
					}
				}, { passive: false });

				let startY = 0;
				el.addEventListener('touchstart', e => {
					startY = e.touches[0].clientY;
				});
				el.addEventListener('touchmove', e => {
					const currentY = e.touches[0].clientY;
					const deltaY = startY - currentY;
					const atTop = el.scrollTop === 0;
					const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

					if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
						e.stopPropagation();
					}
				}, { passive: false });
			});
		}

	// ---------------------- SLIDER-menu-header----------------------
		const slideLinks = document.querySelectorAll('.header__link');

		function updateSlideMenu(swiper) {
			const activeSlide = swiper.slides[swiper.activeIndex];
			const dataAttribute = activeSlide.getAttribute('data-slide');

			slideLinks.forEach(link => {
				const slideIndex = parseInt(link.getAttribute('data-slide'));
				if (dataAttribute == slideIndex) {
					slideLinks.forEach(item => item.classList.remove('header__link--active'));
					link.classList.add('header__link--active');
				} else {
					link.classList.remove('header__link--active');
				}
			});
		}

		function setupMenuListeners(swiper) {
			slideLinks.forEach(link => {
				link.addEventListener('click', function (e) {
					e.preventDefault();
					const slideIndex = parseInt(this.getAttribute('data-slide'));
					swiper.slideTo(slideIndex);
					slideLinks.forEach(item => item.classList.remove('header__link--active'));
					this.classList.add('header__link--active');
				});
			});
		}

	// ---------------------- SLIDER-menu-footer----------------------
		const slideFooterLinks = document.querySelectorAll('.footer__link');

		function updateSlideFooterMenu(swiper) {
			const activeSlide = swiper.slides[swiper.activeIndex];
			const dataAttribute = activeSlide.getAttribute('data-slide');

			slideFooterLinks.forEach(link => {
				const slideIndex = parseInt(link.getAttribute('data-slide'));
				if (dataAttribute == slideIndex) {
					slideLinks.forEach(item => item.classList.remove('footer__link--active'));
					link.classList.add('footer__link--active');
				} else {
					link.classList.remove('footer__link--active');
				}
			});
		}

		function setupMenuFooterListeners(swiper) {
			slideFooterLinks.forEach(link => {
				link.addEventListener('click', function (e) {
					e.preventDefault();
					const slideIndex = parseInt(this.getAttribute('data-slide'));
					swiper.slideTo(slideIndex);
					slideLinks.forEach(item => item.classList.remove('footer__link--active'));
					this.classList.add('footer__link--active');
				});
			});
		}

	//----------------------HAMBURGER-----------------------
		const hamburger = (hamburgerButton, hamburgerNav, hamburgerHeader) => {
			const button = document.querySelector(hamburgerButton),
						nav = document.querySelector(hamburgerNav),
						header = document.querySelector(hamburgerHeader);
	
			button.addEventListener('click', (e) => {
				button.classList.toggle('hamburger--active');
				nav.classList.toggle('header__nav--active');
				header.classList.toggle('header--menu');
			});
	
		};
		hamburger('.hamburger', '.header__nav', '.header');
		
	//----------------------MODAL-----------------------
		const modals = (modalSelector) => {
			const	modal = document.querySelectorAll(modalSelector);

			if (modal) {
				let i = 1;

				modal.forEach(item => {
					const wrap = item.id;
					const link = document.querySelectorAll('.' + wrap);

					link.forEach(linkItem => {
						let close = item.querySelector('.close');
						if (linkItem) {
							linkItem.addEventListener('click', (e) => {
								if (e.target) {
									e.preventDefault();
								}
								item.classList.add('active');
							});
						}

						if (close) {
							close.addEventListener('click', () => {
								item.classList.remove('active');
							});
						}

						item.addEventListener('click', (e) => {
							if (e.target === item) {
								item.classList.remove('active');
							}
						});
					});
				});
			}

		};
		modals('.modal');

	//----------------------FORM-----------------------
		const forms = (formsSelector) => {
			const form = document.querySelectorAll(formsSelector);
			let i = 1;
			let img = 1;
			let lebel = 1;
			let prev = 1;

			form.forEach(item => {
				const elem = 'form--' + i++;
				item.classList.add(elem);

				let formId = item.id = (elem);
				let formParent = document.querySelector('#' + formId);

				formParent.addEventListener('submit', formSend);

				async function formSend(e) {
					e.preventDefault();

					let error = formValidate(item);

					let formData = new FormData(item);

					if (error === 0) {
						item.classList.add('_sending');
						let response = await fetch('sendmail.php', {
							method: 'POST',
							body: formData
						});

						if (response.ok) {
							let modalThanks = document.querySelector('#modal__thanks');
							let modalClose = document.querySelectorAll('.modal');

							modalClose.forEach(modalItem => {
								modalItem.classList.remove('active');
							});
							
							modalThanks.classList.add('active');
							item.reset();
							item.classList.remove('_sending');
						} else {
							alert('Помилка при відправці');
							item.classList.remove('_sending');
						}

					}
				}

				function formValidate(item) {
					let error = 0;
					let formReq = formParent.querySelectorAll('._req');

					for (let index = 0; index < formReq.length; index++) {
						const input = formReq[index];
						if (input.classList.contains('_email')) {
							if(emailTest(input)) {
								formAddErrorEmail(input);
								error++;
							}
						} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
							formAddErrorCheck(input);
							error++;
						} else {
							if (input.value === '') {
								formAddError(input);
								error++;
							}
						}
					}
					return error;
				}

				const formImgFile = formParent.querySelectorAll('.formImgFile');

				formImgFile.forEach(item => { 
					const elem = 'formImgFile--' + i++;

					let formId = item.id = (elem);
					let formParent = document.querySelector('#' + formId);

					const formImage = formParent.querySelector('.formImage');
					const formLebel = formParent.querySelector('.formLebel');
					const formPreview = formParent.querySelector('.formPreview');

					//картинка в форме
					let formImageNumber = 'formImage--' + img++;
					let formPreviewNumber = 'formPreview--' + prev++;
					
					formImage.id = (formImageNumber);
					formLebel.htmlFor = ('formImage--' + lebel++);
					formPreview.id = (formPreviewNumber);
					const formImageAdd = document.querySelector('#' + formImageNumber);

					// изменения в инпуте файл
					formImageAdd.addEventListener('change', () =>  {
						uploadFile(formImage.files[0]);
					});

					function uploadFile(file) {
				
						if (!['image/jpeg', 'image/png', 'image/gif', 'image/ico', 'application/pdf'].includes(file.type)) {
							alert('Только изображения');
							formImage.value = '';
							return;
						}
				
						if (file.size > 2 * 1024 * 1024) {
							alert('Размер менее 2 мб.');
							return;
						}
				
						var reader = new FileReader();
						reader.onload = function (e) {
							if(['application/pdf'].includes(file.type)) {
								formPreview.innerHTML = `Файл вибраний`;
							}else{
								formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
							}
							
						};
						reader.onerror = function (e) {
							alert('Ошибка');
						};
						reader.readAsDataURL(file);
					}
				})

				function formErorrRemove() {
					let formErorrDelet = document.querySelectorAll('.form__error')
					let formErorrRemove = document.querySelectorAll('.form__input')
					formErorrDelet.forEach(item => {
						item.remove();
					})
					formErorrRemove.forEach(item => {
						item.classList.remove('_error');
					})
				}

				function formAddError(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введіть дані в поле";
					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 4000)
				}

				function formAddErrorEmail(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введіть свою пошту";
					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 4000)
				}

				function formAddErrorCheck(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Згода на обробку персональних даних";
					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
					setTimeout(formErorrRemove, 4000)
				}

				function emailTest(input) {
					return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/. test(input.value);
				}

			});
		};
		forms('.form');

	//------------------------------ACCORDIONS---------------------------
		const accordions = (accordionSelector) => {
			const	accordion = document.querySelectorAll(accordionSelector);

			accordion.forEach(item => {
				const accordionClick = item.querySelector('.accordion__header'),
							accordionContent = item.querySelector('.accordion__content');

				accordionClick.addEventListener('click', (e) => {
					if(!item.classList.contains('accordion--active')) {
						item.classList.add('accordion--active')
						accordionContent.style.height = "auto"
						var height = accordionContent.clientHeight + "px"
						accordionContent.style.height = "0px"
						setTimeout(() => {
							accordionContent.style.height = height
						}, 0)
					
					} else {
						accordionContent.style.height = "0px"
						item.classList.remove('accordion--active')
					}


				});
			});

		};
		accordions('.accordion');

	//----------------------FIXED-HEADER-----------------------
		const headerFixed = (headerFixed, headerActive) => {
			const header =  document.querySelector(headerFixed),
						active = headerActive.replace(/\./, '');
	
			window.addEventListener('scroll', function() {
				const top = pageYOffset;
				
				if (top >= 90) {
					header.classList.add(active);
				} else {
					header.classList.remove(active);
				}
	
			});
	
		};
		headerFixed('.header', '.header--active');

	// ---------------------- scroll  ----------------------
		function initMenu() {
			const screenWidth = window.innerWidth;
			if (screenWidth <= 992) {
				const scrollTo = (scrollTo) => {
					let list = document.querySelector(scrollTo);
					list = '.' + list.classList[0]  + ' li a[href^="#"]';

					document.querySelectorAll(list).forEach(link => {

						link.addEventListener('click', function(e) {
								e.preventDefault();
		
								let href = this.getAttribute('href').substring(1);
			
								const scrollTarget = document.getElementById(href);
			
								const topOffset = 60;
								const elementPosition = scrollTarget.getBoundingClientRect().top;
								const offsetPosition = elementPosition - topOffset;
			
								window.scrollBy({
									top: offsetPosition,
									behavior: 'smooth'
								});

								let button = document.querySelector('.hamburger'),
										nav = document.querySelector('.header__nav'),
										header = document.querySelector('.header');
			
								button.classList.remove('hamburger--active');
								nav.classList.remove('header__nav--active');
								header.classList.remove('header--menu');
						});
					});
				};
				scrollTo('.header__nav');
				scrollTo('.footer__nav');
			}
		}
		window.addEventListener('load', initMenu);
		window.addEventListener('resize', initMenu);
});
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}