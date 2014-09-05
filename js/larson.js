( function($) {
    $.fn.larson = function(param) {
        this.larson_setup = function(nled) {
            this.nled = nled;
            this.rst = nled;
            this.cnt = nled;
            this.timeout = 1000/this.nled;
            this.larson_running = false;

            $(this).find('ul').remove();
            $(this).append('<ul></ul>');
            $(this).find('ul').append( '<li><img src="lib/larson_on.svg" alt=""></li>' );
            for (i=0; i<this.nled-1; ++i){
                $(this).find('ul').append( '<li><img src="lib/larson_off.svg" alt=""></li>' );
            }
        }

        this.larson_start = function() {
            this.larson_setup(this.nled);
            this.larson_running = true;
            this.larson_advance_bkw(this);
        }

        this.larson_stop = function(nled) {
            this.larson_running = false;
        }

        function cwrap(fn,p) {
            return function() { fn(p); }    
        }

        this.larson_advance_bkw = function(p) {
            $(p).find('ul').append( $(p).find('ul>li:first').remove() );
            if(p.larson_running) {
                setTimeout( --p.cnt  ? cwrap(p.larson_advance_bkw, p)
                                     : cwrap(p.larson_advance_fwd, p),
                            p.timeout);
            }
            p.cnt = p.cnt ? p.cnt : p.rst-1;
        }

        this.larson_advance_fwd = function(p) {
            $(p).find('ul').prepend( $(p).find('ul>li:last').remove() );
            if(p.larson_running) {
                setTimeout( --p.cnt  ? cwrap(p.larson_advance_fwd, p)
                                     : cwrap(p.larson_advance_bkw, p),
                            p.timeout);
            }
            p.cnt = p.cnt ? p.cnt : p.rst-1;
        }

        switch(param){
            case 'start': this.larson_start(); break;
            case 'stop': this.larson_stop(); break;
            default: this.larson_setup(param);
        }

        return this;
    }
}
)( jQuery );

