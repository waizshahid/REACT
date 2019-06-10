import Page from 'components/Page';
import React , { Component } from 'react';
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



class OrderPage extends Component {
  convertDate(mydate){
    return( 
      mydate.substring(1,2) === "/" && mydate.substring(3,4) === "/" ?
      mydate.substring(4,8) + "-" + "0" +mydate.substring(0,1) + "-" + "0" + mydate.substring(2,3)
      :
      mydate.substring(1,2) === "/" && mydate.substring(4,5) === "/" ?
      mydate.substring(5,9) + "-" + "0" +mydate.substring(0,1) + "-" + mydate.substring(2,4)
      :
      mydate.substring(2,3) === "/" && mydate.substring(4,5) === "/" ?
      mydate.substring(5,9) + "-"  +mydate.substring(0,2) + "-" + "0"+ mydate.substring(3,4)
      :
      mydate.substring(2,3) === "/" && mydate.substring(5,6) === "/" ?
      mydate.substring(6,10) + "-"  +mydate.substring(0,2) + "-" + mydate.substring(3,5)
      :
      alert('Unreadable date')
  );
  }
    constructor (props) {
      super(props);
      this.state = {
        date: this.convertDate(new Date().toLocaleDateString()),
        customer: '',
        brand: '',
        frame: '',
        size: '',
        quality: '',
        quantity: '',
        formErrors: {customer: '',brand: '',size: '',quantity: '',},
        customerValid: false,
        brandValid: false,
        sizeValid: false,
        quantityValid: false,
        formValid: false
      }

      this.myFunction = this.myFunction.bind(this);
    }

    
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      }
    
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let customerValid = this.state.customerValid;
        let brandValid = this.state.brandValid;
        let sizeValid = this.state.sizeValid;
        let quantityValid = this.state.quantityValid;
    
        switch(fieldName) {
          case 'customer':
            customerValid = value.length >= 1;
            fieldValidationErrors.customer = customerValid ? '' : ' Enter Customer';
            break;
          case 'brand':
            brandValid = value.length >= 1;
            fieldValidationErrors.brand = brandValid ? '': 'Enter Brand';
            break;
            case 'size':
            sizeValid = value.length >= 1;
            fieldValidationErrors.size = sizeValid ? '': ' Enter Size';
            break;
            case 'quantity':
            quantityValid = value.length >= 1;
            fieldValidationErrors.quantity = quantityValid ? '': ' Enter Quantity';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        customerValid: customerValid,
                        brandValid: brandValid,
                        sizeValid: sizeValid,
                        quantityValid: quantityValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.customerValid && this.state.brandValid && this.state.quantityValid && this.state.sizeValid});
      }
    

      myFunction(event)
      {
          event.preventDefault();
          let myobject = {
              Date: this.state.date,
              Customer: this.state.customer,
              Brand: this.state.brand,
              Frame: this.state.frame,
              Size: this.state.size,
              Quality: this.state.quality,
              Quantity: this.state.quantity
              
          }
          alert('You entered: ' + JSON.stringify(myobject, 0, 2));
      }
    


render () {
  return (
    <Page className="header text-center" title="Add New Order">
      <Row>
        <Col xl={6} lg={8} md={12}>
          <Card>
            <CardHeader className="header text-center">Order Details</CardHeader>
            <CardBody>
            <FormErrors formErrors={this.state.formErrors} />
              <Form>
              <Row form>
              <Col sm={4}></Col>
              <Col sm={5}>
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
                  />
                  </FormGroup>
                  </Col>
                </Row>
                <Row form>
                <Col sm={6}>
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
                  </Col>
                  <Col sm={6}>
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
                  </Col>
                </Row>
                <FormGroup row>
                  
                </FormGroup>
                <Row form>
                <Col sm={3}>
                  <Label for="Frame">
                    Frame
                  </Label>
                    <Input 
                    type="select"
                     name="frame"
                     value={this.state.frame}
                     onChange={this.handleUserInput} >
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Green</option>
                    <option>Black</option>
                    
                    </Input>
                  </Col>
                  <Col sm={3}>
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
                  </Col>
                  <Col sm={3}>
                  <Label for="Quality">
                    Quality
                  </Label>
                    <Input type="select" name="quality" value={this.state.quality}
                    onChange={this.handleUserInput}  >
                    <option>1</option>
                    <option>2</option>
                    <option>450</option>
                    <option>Feed</option>
                    </Input>
                  </Col>
                  <Col sm={3}>
                  <Label for="Quantity">
                    # of Bags
                  </Label>
                    <Input
                      type="text"
                      name="quantity"
                      placeholder="Enter Quantity "
                      value={this.state.quantity}
                      onChange={this.handleUserInput} 
                    />
                  </Col>
                </Row>
                <div style={{ padding: '3rem' }}>
                <Button type="submit" onClick={this.myFunction} disabled={!this.state.formValid}>Add Order</Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  )
}
}

export default OrderPage;
