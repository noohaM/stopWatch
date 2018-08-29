class Component
{
    notify() {
        this.callback();
    }

    register(callback) {
        this.callback = callback;
    }

    render() {}
}

class Renderer  
{
    constructor(component,destination)
      {
          this.render = component.render.bind(component);
          this.destination = destination;

          component.register(()=>{
              return this.listen()    
          })

          this.listen();
      }

      listen()
      {
          this.destination.innerHTML = '';
          this.destination.appendChild(this.render());    
      }

}


class Stopwatch extends Component
{
    constructor()
    {

        super();


        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;

        this.time = 0;

    }


    start()
    {

        this.handle = setInterval(()=>{
            //  this.time +=10;
            this.milliseconds+=10;
             if(this.milliseconds == 1000)
             {
                 this.milliseconds = 0;
                 this.seconds++;
                 if(this.seconds==60)
                 {
                     this.seconds = 0;
                     this.minutes++;

                     if(this.minutes==60)
                     {
                         this.minutes = 0;
                         this.hours++;
                     }
                 }
             }
             this.notify();
        },10)
    }

    pause()
    {
        clearInterval(this.handle)
    }

    formatTime()
    {
      return (this.hours > 9 ? this.hours : "0"+ this.hours)
      +":"+(this.minutes > 9 ? this.minutes : "0" + this.minutes)
      +":"+(this.seconds > 9 ? this.seconds : "0" + this.seconds)
      +":"+(this.milliseconds > 9 ? this.milliseconds : "0" + this.milliseconds)


        // const hour = Math.floor(number/1000/60/60);
        // const minutes = Math.floor(number/60000) % (3600);
        // const seconds =  Math.floor(number / 1000) % 60;
        // const milliseconds  = number%1000;

      
        // return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}.${('00' + milliSeconds).slice(-3)}`;
    }

    reset()
    {
       
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;

       clearTimeout (this.handle);

       this.notify();
    }


    render()
    {
        return $(`<div>`).append($(`<h1>`).html(this.formatTime())).append([
            $('<button>').html('start').mousedown(this.start.bind(this)),
            $('<button>').html('pause').mousedown(this.pause.bind(this)),
            $('<button>').html('reset').mousedown(this.reset.bind(this))
        ])[0];
    }


}