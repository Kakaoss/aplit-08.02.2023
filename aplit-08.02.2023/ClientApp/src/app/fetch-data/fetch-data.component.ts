import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Console } from 'console';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  summary:string = ""
  public summaries: string[] = [];
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
  
  ngOnInit(){
      this.getSummaries();
    }
  getSummaries() {
    this.http.get<string[]>(this.baseUrl + 'weatherforecast/getSummaries').subscribe(result => {
      this.summaries = result;
    }, error => console.error(error));
  }
  addSummary() {
    console.log(this.summary);
    var summary = {
      summaryDesc: this.summary
    }
    this.http.post<string[]>(this.baseUrl + 'weatherforecast/AddSummaries', this.summary).subscribe(result => {
      this.getSummaries()
    }, error => console.error(error));
  }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
interface Summary {
  summary: string;
}
