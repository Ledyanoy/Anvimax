require('intersection-observer');

function GaAnalytics(counterId) {
  this.GA_TRACKING_ID = counterId;
  this.EVENT_TYPE_DISPLAY = 'screens';
  this.EVENT_TYPE_CLICK = 'clicks';

  this.screenClass = 'js-counters-scroll';
  this.clickClass = 'js-counters-click';

  this.observerOptions = {
    rootMargin: '0px',
    threshold: 0.3,
  };

  this.init = () => {
    this.screens = Array.from(document.getElementsByClassName(this.screenClass));
    this.clicks = Array.from(document.getElementsByClassName(this.clickClass));
    this.analyzedElements = [];

    // Инициализация аналитики
    window.dataLayer = window.dataLayer || [];
    this.gtag('js', new Date());
    this.gtag('config', this.GA_TRACKING_ID);

    this.setScreenCounter(this.screens, this.EVENT_TYPE_DISPLAY);
    this.setClickCounter(this.clicks, this.EVENT_TYPE_CLICK);
  };

  this.gtag = function() {
    window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
  };

  this.sendGoogleAnalytics = (eventType, eventName, gaPagePath = '/') => {
    if (eventType === this.EVENT_TYPE_DISPLAY) {
      this.gtag('config', this.GA_TRACKING_ID, {
        page_title: eventName,
        page_path: gaPagePath,
      });
    } else {
      this.gtag('event', eventType, {
        event_category: eventType,
        event_label: eventName,
        event_action: eventName,
      });
    }
  };

  // Установка наблюдателей на секции
  this.setScreenCounter = (screenElements, eventType) => {
    const screens = screenElements.map(screen => ({
      gaAttr: screen.getAttribute('data-ga-event'),
      gaPagePath: screen.getAttribute('data-ga-path'),
      eventType,
      height: screen.getBoundingClientRect().height || null,
      selector: screen,
      status: false,
      amount: 0,
      isIntersecting: false,
    }));

    // Callback при срабатывании IntersectionObserver
    const checkStatus = (entries) => {
      screens.forEach((elem) => {
        if (elem.selector === entries[0].target) {
          if (!elem.isIntersecting && entries[0].isIntersecting) {
            elem.isIntersecting = true;
            elem.amount += 1;

            this.sendGoogleAnalytics(
              elem.eventType,
              elem.gaAttr,
              elem.gaPagePath,
              elem.amount
            );
          } else {
            elem.isIntersecting = false;
          }
        }
      });
    };

    // Установка IntersectionObserver-ов на необходимые блоки
    screens.forEach((screen) => {
      // eslint-disable-next-line no-undef
      const observer = new IntersectionObserver(checkStatus, this.observerOptions);

      observer.observe(screen.selector);
    });

    this.analyzedElements = this.analyzedElements.concat(screens);
  };

  this.setClickCounter = (clickElements, eventType) => {
    const clicks = clickElements.map((element) => {
      const gaAttr = element.getAttribute('data-ga-event');

      element.addEventListener('click', () => {
        this.sendGoogleAnalytics(
          eventType,
          gaAttr
        );
      });

      return {
        element,
        gaAttr,
        eventType,
        selector: element,
      };
    });

    this.analyzedElements = this.analyzedElements.concat(clicks);
  };
}

export default GaAnalytics;
