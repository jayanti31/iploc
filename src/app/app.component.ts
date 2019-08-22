import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user_ip: string;
  iploc: any;
  todaysTemp:any;
  rest: string = "http://ip-api.com/json/";
  weather;
  constructor(private http: HttpClient){}
  get_location(ip)
  {
    let url1 = this.rest+ip;   // rest call 1
    console.log(url1);
    this.http.get(url1).toPromise()
    .then(e=>
      { 
        if(JSON.parse(JSON.stringify(e)).status == 'success')
        {
          
           this.iploc = JSON.parse(JSON.stringify(e));
           let lat = this.iploc.lat;
           let lng = this.iploc.lon;
           let unix = Math.round(+new Date()/1000);
           let url2 = "http://localhost:8888/test_server/test.php?url=https://api.darksky.net/forecast/f9f73e0da4c7414ecd68e8e0f3edcdf8/"+lat+","+lng+","+unix;
           this.http.get(url2).toPromise()
          .then(resp=>
            {
              console.log(resp);
              let weather = JSON.parse(JSON.stringify(resp));
              this.weather = weather.currently;
              console.log(this.weather);
              this.weather.temperature = ( parseFloat( this.weather.temperature) - 32 ) * (5/9);
              this.weather.humidity = ( parseFloat( this.weather.humidity) *100 );

             
            })
          console.log(url2);
        }
         
      } 
      ,(err)=>
      {
        console.log(err);
      })
      .catch(err=>{
        console.log(err);
      });
  }
}
