import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sortBy"
})
export class SortByPipe implements PipeTransform {
  transform(records: Array<any>, args: any): any {
    if (
      records &&
      records.length > 0 &&
      args.property &&
      args.property.length > 0
    ) {
      return records.sort(function(a, b) {
        if (typeof a[args.property] === "string") {
          const newa = a[args.property]
            ? JSON.stringify(a[args.property]).toLowerCase()
            : "";
          const newb = b[args.property]
            ? JSON.stringify(b[args.property]).toLowerCase()
            : "";

          if (newa < newb) {
            return -1 * args.direction;
          } else if (newa > newb) {
            return 1 * args.direction;
          } else {
            return 0;
          }
        }

        if (a[args.property] < b[args.property]) {
          return -1 * args.direction;
        } else if (a[args.property] > b[args.property]) {
          return 1 * args.direction;
        } else {
          return 0;
        }
      });
    } else {
      return records;
    }
  }
}
