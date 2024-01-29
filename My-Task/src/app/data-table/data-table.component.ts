import { Component, OnInit } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';
declare var $: any;
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {



  getSelectedValue(value: any) {
    const obj: any = [
      { "name": "Sahaj", "address": "Megal", "Contact": "09409036035", "role": "Administrative" },
      { "name": "asdf", "address": "Megal", "Contact": "09409036035", "role": "HR" },
      { "name": "Yash", "address": "Patan", "Contact": "9988776621", "role": "Marketing" },
      { "name": "Yashraj", "address": "Patan", "Contact": "9988776621", "role": "Sales" },
      { "name": "Deep", "address": "Chhapi", "Contact": "8877443392", "role": "Marketing" }
    ]



    function findRowByRole(obj: any[], data: any) {
      return obj.filter(obj => obj.role == data);
    }

    const result = findRowByRole(obj, value);

    console.log(result);
    result.forEach(elemrnt => {
      let rowdata = [elemrnt.name, elemrnt.address, elemrnt.Contact, elemrnt.role]
      $('.table').DataTable().row.add(rowdata).draw();

    })
  }


  // Call the function with your array and the role you want to find


  ngOnInit(): void {
    var groupColumn = 3;
    console.log(groupColumn)
    $('.table').DataTable({
      order: [[groupColumn, 'asc']],
      drawCallback: function (settings: any) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last: any = null;

        api.column(groupColumn, { page: 'current' })
          .data()
          .each(function (group: any, i: any) {
            if (last !== group) {
              $(rows)
                .eq(i);
              // .before(
              //     '<tr class="group"><td colspan="5">' +
              //         group +
              //         '</td></tr>'
              // );

              last = group;
            }
          });
      }
    });

  } 

}
