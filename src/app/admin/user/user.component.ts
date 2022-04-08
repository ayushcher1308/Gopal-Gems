import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private dataService: DataService) {}

  defaultColumnDefs: ColDef = {
    sortable: true,
    floatingFilter: true,
    filter: true,
    resizable: true,
  };
  gridApi: any;
  gridColumnApi: any;
  eventButtons = false;
  loader = true;
  message = 'Testing';
  alert = false;
  type = true;

  ngOnInit(): void {
    this.fetchUsers();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  showAlert(typeOfNotification: boolean) {
    this.alert = true;
    this.type = typeOfNotification;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

  isRowSelectable = function (rowNode: any) {
    return rowNode.data
      ? rowNode.data.status.toLowerCase() == 'pending'
      : false;
  };

  processRequests(status: any) {
    this.loader = true;
    const selectedRows = this.gridApi.getSelectedRows();
    let user = [];
    for (let i = 0; i < selectedRows.length; i++)
      user.push(selectedRows[i]._id);
    const obj = {
      user: user,
      status: status,
    };
    this.dataService.approveRejectUsers(obj).subscribe(
      (res) => {
        if (!res.success) {
          this.message = 'Some error has occured. Please try again later';
          this.showAlert(false);
          this.loader = false;
        } else {
          this.message = `Successfully ${status}`;
          this.showAlert(true);
          this.fetchUsers();
        }
      },
      (err) => {
        this.message = 'Some error has occured. Please try again later';
        this.showAlert(false);
        this.loader = false;
      }
    );
  }

  fetchUsers() {
    this.rowData = [];
    this.columnDefs = [
      {
        field: '',
        headerName: '',
        sortable: false,
        filter: false,
        resizable: false,
        checkboxSelection: true,
        width: 40,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
    ];
    this.dataService.fetchAllUsersAdmin().subscribe((res) => {
      const rows = res;
      this.rowData = rows;
      const headers = Object.keys(rows[0]);
      for (let i = 0; i < headers.length; i++) {
        if (headers[i] != '_id') this.columnDefs.push({ field: headers[i] });
        else this.columnDefs.push({ field: headers[i], hide: true });
      }
      if (this.gridApi != null) {
        this.gridApi.setRowData(rows);
      }
      this.loader = false;
    });
  }

  selectionRows(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length != 0) {
      this.eventButtons = true;
    } else this.eventButtons = false;
  }

  columnDefs: ColDef[] = [];

  rowData = [];
}
