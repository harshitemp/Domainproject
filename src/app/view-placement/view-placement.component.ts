import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopnavallComponent } from '../topnavall/topnavall.component';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-view-placement',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopnavallComponent], // Add CommonModule here
  templateUrl: './view-placement.component.html',
  styleUrls: ['./view-placement.component.css']
})
export class ViewPlacementComponent {
  excelData: any[] = []; // Holds the rows of the Excel data
  excelHeaders: string[] = []; // Holds the headers of the Excel data
  placementStatus: string = ''; // Status message displayed in the UI

  // Handle the file change event when a file is uploaded
  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    // Check if only one file is selected
    if (target.files.length !== 1) {
      this.placementStatus = 'Please select a single file.';
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      try {
        // Read the workbook from the binary string
        const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName: string = workbook.SheetNames[0]; // Get the first sheet
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

        // Convert the worksheet to JSON with headers
        const excelJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        this.excelHeaders = excelJson[0] as string[]; // First row as headers
        this.excelData = excelJson.slice(1); // Subsequent rows as data

        if (this.excelData.length > 0) {
          this.placementStatus = 'Excel data loaded successfully.';
        } else {
          this.placementStatus = 'Excel file is empty or data format is incorrect.';
        }
      } catch (error) {
        this.placementStatus = 'Failed to read the Excel file. Please check the file format.';
        console.error(error); // Log the error for debugging
      }
    };

    // Read the file as a binary string
    reader.readAsBinaryString(target.files[0]);
  }

  // Handle the View Placement button click
  viewPlacement(): void {
    // Ensure that the data is loaded before displaying it
    if (this.excelData.length === 0) {
      this.placementStatus = 'No data available. Please upload an Excel file first.';
      return;
    }
    this.placementStatus = 'Displaying placement data.';
  }
}
