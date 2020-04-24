import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateFormatPipe"
})
export class DateFormatPipe implements PipeTransform {
  pipe = new DatePipe("en-US");

  transform(value: any): any {
    return this.pipe.transform(value, "HH:mm");
  }
}
