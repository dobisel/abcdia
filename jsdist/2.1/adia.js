class ADia {
  delay = 0; // ms

  // new, inititializing, processing, idle
  #_status = 'new';

  /* Private Fields */
  #_delayTimer;
  #_source;

  constructor(options) {
    this.cleanCallback = options.clean;
    this.successCallback = options.success;
    this.errorCallback = options.error;
    this.statusCallback = options.status;
    this.input = options.input;
    if (options.delay != undefined) {
      this.delay = options.delay;
    }
    if (options.loadingProbeInterval != undefined) {
      this.loadingProbeInterval = options.loadingProbeInterval;
    }
  }
  
  get status() {
    return this.#_status;
  }

  set status(newValue) {
    this.#_status = newValue;
    if (this.statusCallback) {
      this.statusCallback(newValue);
    }
  }

  ensureADiaAPI() {
    this.status = 'initializing'
    if (window.__adia__ == undefined) {
      setTimeout(this.ensureADiaAPI.bind(this), this.loadingProbeInterval);
      return;
    }
    
    window.__adia__.callback = this.onResult.bind(this);
    window.__adia__.send('');
  }
  
  send() {
    let newSource = this.input();
    if (this.#_source == newSource) {
      /* Do Nothing */
      return;
    }
    
    this.status = 'processing';
    this.#_source = newSource;
    window.__adia__.send(this.#_source);
  }

  go() {
    switch (this.status) {
      case 'new':
        this.ensureADiaAPI();
        break;
      case 'idle':
        if (this.delay > 0) {
          clearTimeout(this.#_delayTimer);
          this.#_delayTimer = setTimeout(this.send.bind(this), this.delay);
        }
        else {
          this.send();
        }
      case 'initializing':
      case 'processing':
        /* Do nothing, initializer and fee will call me again. */
        break;
    }
  }
  
  onResult(result) {
    this.cleanCallback();
    if (result.error) {
      this.errorCallback(result.error);
    }
    else {
      this.successCallback(result.diagram);
    }
    this.status = 'idle';
    this.go();
  }
}