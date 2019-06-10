import Page from 'components/Page';
import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';


class SalesPage extends Component {

  convertDate(mydate) {
    return (
      mydate.substring(1, 2) === '/' && mydate.substring(3, 4) === '/' ?
        mydate.substring(4, 8) + '-' + '0' + mydate.substring(0, 1) + '-' + '0' + mydate.substring(2, 3)
        :
        mydate.substring(1, 2) === '/' && mydate.substring(4, 5) === '/' ?
          mydate.substring(5, 9) + '-' + '0' + mydate.substring(0, 1) + '-' + mydate.substring(2, 4)
          :
          mydate.substring(2, 3) === '/' && mydate.substring(4, 5) === '/' ?
            mydate.substring(5, 9) + '-' + mydate.substring(0, 2) + '-' + '0' + mydate.substring(3, 4)
            :
            mydate.substring(2, 3) === '/' && mydate.substring(5, 6) === '/' ?
              mydate.substring(6, 10) + '-' + mydate.substring(0, 2) + '-' + mydate.substring(3, 5)
              :
              alert('Unreadable date')
    );
  }
  rowObject = {
    id:1,
    units:"",
    weight:"",
    quantity:""
  };
  constructor(props) {
    super(props);
    this.state = {
      date: this.convertDate(new Date().toLocaleDateString()),
      customer: '',
      brand: '',
      frame: '',
      size: '',
      quality: '',
      name: '',
      row: [],
      numberOfRows: 0,
      formErrors: { customer: '', brand: '', size: '' },
      customerValid: false,
      brandValid: false,
      sizeValid: false,
      formValid: false,
    };

    this.myFunction = this.myFunction.bind(this);
    this.onFieldInput = this.onFieldInput.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
  }

  handleQuantityChange = idx => evt => {
    const newquantity = this.state.row.map((quantity, sidx) => {
      if (idx !== sidx) return quantity;
      return { ...quantity, name: evt.target.value };
    });
    this.setState({ quantity: newquantity });
  };

  handleUnitChange = idx => evt => {
    const newunit = this.state.row.map((row, sidx) => {
      if (idx !== sidx) return row;
      return { ...row.unit, name: evt.target.value };
    });
    this.setState({ unit: newunit });
  };

  handleAddRow = (event) => {
    event.preventDefault();
    let newObject = {...this.rowObject};
    newObject.id = this.state.numberOfRows;
    this.setState(prevState=>({
      row:[...prevState.row,newObject],
      numberOfRows: prevState.numberOfRows+1
    }))
  };

  handleRemoveRow = () => {
    let newArray  = [...this.state.row];
    newArray.pop();
    this.setState(
      {
      row:newArray, numberOfRows: this.state.numberOfRows-1
    });
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => {
        this.validateField(name, value);
      });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let customerValid = this.state.customerValid;
    let brandValid = this.state.brandValid;
    let sizeValid = this.state.sizeValid;
    let quantityValid = this.state.quantityValid;

    switch (fieldName) {
      case 'customer':
        customerValid = value.length >= 1;
        break;
      case 'brand':
        brandValid = value.length >= 1;
        break;
      case 'size':
        sizeValid = value.length >= 1;
        break;
      case 'quantity':
        quantityValid = value.length >= 1;
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      customerValid: customerValid,
      brandValid: brandValid,
      sizeValid: sizeValid,
      quantityValid: quantityValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.customerValid && this.state.brandValid && this.state.quantityValid && this.state.sizeValid });
  }

  myFunction(event) {
    event.preventDefault();
    let myobject = {
      Date: this.state.date,
      Customer: this.state.customer,
      Brand: this.state.brand,
      Frame: this.state.frame,
      Size: this.state.size,
      Quality: this.state.quality,
      Quantity: this.state.quantity,
    };
    alert('You entered: ' + JSON.stringify(myobject, 0, 2));
  }

  onFieldInput(event,index){
    const target = event.currentTarget;
    console.log(index, event.currentTarget.value, event.currentTarget.name);
    let targetRow = this.state.row[index];
    targetRow[target.name] = target.value;
    this.setState();
  };

  render() {
    return (
      <Page className="header text-center" title="Add New Order">
        <Row>
          <Col xl={6} lg={8} md={12}>
            <Card>
              <CardHeader className="header text-center">Order Details</CardHeader>
              <CardBody>
                <FormErrors formErrors={this.state.formErrors}/>
                <Form>
                  <Row form>
                    <Col sm={4}>
                      <FormGroup>
                        <Label for="Date">
                          Date
                        </Label>
                        <Input
                          type="date"
                          name="date"
                          id="date"
                          placeholder="date"
                          value={this.state.date}
                          onChange={this.handleUserInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={8}>
                      <FormGroup>
                        <Label for="Customer">
                          Party
                        </Label>
                        <Input
                          type="text"
                          name="customer"
                          placeholder="Enter Name"
                          value={this.state.customer}
                          onChange={this.handleUserInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col sm={5}>
                      <FormGroup>
                        <Label for="Brand">
                          Brand
                        </Label>

                        <Input
                          type="text"
                          name="brand"
                          placeholder="Enter Brand/Sterio Name"
                          value={this.state.brand}
                          onChange={this.handleUserInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={2}>
                      <FormGroup>
                        <Label for="Quality">
                          Quality
                        </Label>
                        <Input type="select" name="quality" value={this.state.quality}
                               onChange={this.handleUserInput}>
                          <option>1</option>
                          <option>2</option>
                          <option>450</option>
                          <option>Feed</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label for="Size">
                          Size
                        </Label>
                        <Input
                          type="text"
                          name="size"
                          placeholder="Enter Size"
                          value={this.state.size}
                          onChange={this.handleUserInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={2}>
                      <FormGroup>
                        <Label for="Frame">
                          Frame
                        </Label>
                        <Input
                          type="select"
                          name="frame"
                          value={this.state.frame}
                          onChange={this.handleUserInput}>
                          <option>Red</option>
                          <option>Blue</option>
                          <option>Green</option>
                          <option>Black</option>

                        </Input>
                      </FormGroup>
                    </Col>

                  </Row>

                  <Row>
                    <Col sm={1}>
                      <Label for="#">
                        #
                      </Label>
                    </Col>

                    <Col sm={3}>
                      <Label for="Units">
                        Units
                      </Label>
                    </Col>

                    <Col sm={3}>
                      <Label for="Weight">
                        Weight
                      </Label>
                    </Col>

                    <Col sm={4}>
                      <Label for="Quantity">
                        Quantity
                      </Label>
                    </Col>

                  </Row>

                  {
                    this.state.row.map((r,index) =>{
                      return (
                        <Row key={index}>
                          <div>
                            <Col sm={1}>
                              <Label for="#">
                                {r.id+1}
                              </Label>
                            </Col>
                          </div>

                          <Col sm={3}>
                            <FormGroup>
                              <Input
                                type="text"
                                name='units'
                                placeholder={`Enter Units`}
                                //value={r.units}
                                onChange={(event)=>{this.onFieldInput(event, index)}}
                              />
                            </FormGroup>
                          </Col>

                          <Col sm={3}>
                            <FormGroup>
                              <Input
                                type="text"
                                name='weight'
                                placeholder={`Enter Weight`}
                                //value={r.weight}
                                onChange={(event)=>{this.onFieldInput(event, index)}}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm={3}>
                            <FormGroup>
                              <Input
                                type="text"
                                name='quantity'
                                placeholder={`Enter Quantity`}
                                //value={r.quantity}
                                onChange={(event)=>{this.onFieldInput(event, index)}}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      )
                    })
                  }

                  <Row form>
                    <Button type="button" onClick={this.handleAddRow}>+</Button>
                    <Button type="button" onClick={this.handleRemoveRow}>-</Button>
                  </Row>
                  <Button type="submit" onClick={this.myFunction} disabled={!this.state.formValid}>Add Order</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default SalesPage;
