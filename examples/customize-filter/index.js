import React from "react";
import ReactDOM from "react-dom";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MUIDataTable from "../../src";

class Example extends React.Component {

  render() {

    const columns = [
      {
        name: "name",
        options: {
          filter: true,
          display: 'excluded',
        }
      },
      {
        label: "Modified Title Label",
        name: "title",
        options: {
          filter: true,
        }
      },
      {
        name: "location",
        options: {
          print: false,
          filter: false,
        }
      },
      {
        name: "age",
        options: {
          filter: true,
          filterOptions: {
            names: ["young", "adult", "middle-age", "senior", "elderly"],
            logic(age, filters) {
              const show = (filters.indexOf("young") >= 0 && age <= 35) ||
                (filters.indexOf("adult") >= 0 && age > 35 && age <= 45) ||
                (filters.indexOf("middle-age") >= 0 && age > 45 && age <= 65) ||
                (filters.indexOf("senior") >= 0 && age > 65 && age <= 75) ||
                (filters.indexOf("elderly") >= 0 && age > 75);
              const filtered = !show;
              return filtered;
            }
          },
          print: false,
        }
      },
      {
        name: "salary",
        options: {
          filter: true,
          filterType: "checkbox",
          filterOptions: {
            names: ["Lower wages", "Average wages", "Higher wages"],
            logic(salary, filterVal) {
              salary = salary.replace(/[^\d]/g, "");
              const show = (filterVal.indexOf("Lower wages") >= 0 && salary < 100000) ||
                (filterVal.indexOf("Average wages") >= 0 && salary >= 100000 && salary < 200000) ||
                (filterVal.indexOf("Higher wages") >= 0 && salary >= 200000);
              return !show;
            }
          },
          sort: false
        }
      },
      {
        name: "phone.home",
        label: "Phone"
      },
      {
        name: "extra",
        options: {
          display: false,
          viewColumns: false,
          filter: false,
          sort: false,
          download: false,
          print: false,
        }
      }
    ];


    const data1 = [
      ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
      ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
      ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
      ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
      ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
      ["Blake Duncan", "Business Management Analyst", "San Diego", 65, "$94,000"],
      ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
      ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
      ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
      ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
      ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
      ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
      ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
      ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
      ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
      ["Addison Navarro", "Business Management Analyst", "New York", 50, "$295,000"],
      ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
      ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
      ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
      ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
      ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
      ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
      ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
      ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
      ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
      ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
      ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
      ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
      ["Gabby Strickland", "Business Process Consultant", "Scottsdale", 26, "$45,000"],
      ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
    ];


    const data = [
      { name: "Gabby George", title: "Business Analyst", location: "Minneapolis", age: 30, salary: "$100,000", phone: { home: '867-5309', cell: '123-4567' } },
      { name: "Aiden Lloyd", title: "Business Consultant", location: "Dallas",  age: 55, salary: "$200,000", phone: { home: '867-5310', cell: '123-4568' }, 
        /* extra: [
        {id:1, name: "placement 1", location:"USA", age: 99, salary: "$123"},
        {id:2, name: "placement X", location:"CO", age: 66, salary: "$456"}
      ]*/ },
      { name: "Jaden Collins", title: "Attorney", location: "Santa Ana", age: 27, salary: "$500,000", phone: { home: '867-5311', cell: '123-4569' }, extra: [
        {id:5, name: "placement 2", location:"USA2", age: 99, salary: "$1234"},
        {id:6, name: "placement Y", location:"CO2", age: 66, salary: "$4567"}
      ] },
      { name: "Franky Rees", title: "Business Analyst", location: "St. Petersburg", age: 22, salary: "$50,000", phone: { home: '867-5312', cell: '123-4569' } }
    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      expandableRows: true,
      expandableRowsOnClick: false,
      downloadOptions: {
        filterOptions: {
          useDisplayedColumnsOnly: true,
          useDisplayedRowsOnly: true,
        }
      },
      renderExpandableRow: (rowData) => {
        const colSpan = rowData.length + 1;

        // Placements of this row are located in the last column of this row
        const data = rowData[rowData.length-1];
        if(data && data.length>0) {
          return (
            <TableRow>
              <TableCell colSpan={colSpan}>
                {JSON.stringify(data)}
              </TableCell>
            </TableRow>
          );          
        }
        return null;
      },
      onDownload: (buildHead, buildBody, columns, data) => {
        // debugger;
        // console.log(columns, data);
        const csvHead = columns.reduce((soFar, col) => {
          let name = col.name;
          if (col.name==='toggle_play') {
            name = 'Status';
          } else if (col.name==='total_placement') {
            name = 'Placements';
          } else if (col.name==='platform_name') {
            name = 'Platform';
          } else {
            name = col.name.charAt(0).toUpperCase() + col.name.slice(1);
          }
          return col.download ? `${soFar}"${name}",` : soFar;
        }, '');

        const csvBody = data.reduce((soFar, row) => {
          const newRow = row.data
            .filter((_, index) => columns[index].download)
            .map((value, index) => {
              if (index===0) {
                return value.props && value.props['data-value'] ? 'active' : 'inactive';
              } else if (index===1) {
                return value.props ? value.props['data-value'] : value;
              }
              return value;
            }).join('","');

          if (data.expandable && data.expandable.lookup[row.dataIndex]) {
            debugger;
            const fullRowData = data.expandable.data.find(rowItem => {
              return rowItem.dataIndex === row.dataIndex;
            });

            if (fullRowData && fullRowData.data && fullRowData.data[ fullRowData.data.length-1 ]) {
              const expandedRows = fullRowData.data[ fullRowData.data.length-1 ].reduce((inner, expandRow) => {
                const line = columns.reduce((tmp, col) => {
                  const colName = col.name.toLowerCase();
                  return expandRow[colName] ? `${tmp}"${expandRow[colName]}",` : `${tmp},`;
                }, '');
                return `${inner}${line.slice(0, -1)}\r\n`;
              }, `"${newRow}"\r\n`);
              return `${soFar}${expandedRows}`;              
            }
          }

          // return line without expanded data:
          return `${soFar}"${newRow}"\r\n`;

        }, '');


        // debugger;
        return `${csvHead.slice(0, -1)}\r\n${csvBody.trim()}`;
      }
    };

    return (
      <MUIDataTable title={"ACME Employee list - customizeFilter"} data={data} columns={columns} options={options} />
    );

  }
}

ReactDOM.render(<Example />, document.getElementById("app-root"));