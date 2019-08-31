import React, { Component } from 'react'
// import axios from 'axios'
import { List, Image, Card } from 'semantic-ui-react'

class EmployeeList extends Component {
  state = {
    employees: []
  };
  fetchEmployees() {
    let employeesList = 
    {
      "page": 1,
      "per_page": 5,
      "total": 12,
      "total_pages": 3,
      "data": [
        {
          "id": 1,
          "email": "george.bluth@reqres.in",
          "first_name": "George",
          "last_name": "Bluth",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
        },
        {
          "id": 2,
          "email": "janet.weaver@reqres.in",
          "first_name": "Janet",
          "last_name": "Weaver",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
        },
        {
          "id": 3,
          "email": "emma.wong@reqres.in",
          "first_name": "Emma",
          "last_name": "Wong",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
        },
        {
          "id": 4,
          "email": "eve.holt@reqres.in",
          "first_name": "Eve",
          "last_name": "Holt",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          "id": 5,
          "email": "charles.morris@reqres.in",
          "first_name": "Charles",
          "last_name": "Morris",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        }
      ]
    };

    this.setState({ employees: employeesList.data });
    console.log('asdf');
    console.log(employeesList.data);
    console.log(this.state);
  }
  componentDidMount() {
    this.fetchEmployees();

  }
  render() {
    let { employees } = this.state;
    console.log(this.state);  
    let employeesList = employees.map(employee => {
      return (
        <Card>
        <Image src={employee.avatar} />
        <Card.Content>
          <Card.Header key={employee.id}>
              {`${employee.first_name}`}
          </Card.Header>
        </Card.Content>
        </Card>
      )
    });
    return employeesList;
  }
}

export default EmployeeList;