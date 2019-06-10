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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

class PurchasePage extends Component {
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
        supplier: '',
        category: '',
        item: '',
        quantity: '',
        weight: '',
        amount: '',
        formErrors: {supplier: '',item: '',weight: '',quantity: '',},
        supplierValid: false,
        itemValid: false,
        weightValid: false,
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
        let supplierValid = this.state.supplierValid;
        let itemValid = this.state.itemValid;
        let weightValid = this.state.weightValid;
        let quantityValid = this.state.quantityValid;
        let amountValid = this.state.quantityValid;
    
        switch(fieldName) {
          case 'supplier':
            supplierValid = value.length >= 1;
            fieldValidationErrors.supplier = supplierValid ? '' : ' Enter Supplier';
            break;
          case 'item':
            itemValid = value.length >= 1;
            fieldValidationErrors.item = itemValid ? '': 'Enter item';
            break;
            case 'weight':
            weightValid = value.length >= 1;
            fieldValidationErrors.weight = weightValid ? '': ' Enter weight';
            break;
            case 'quantity':
            quantityValid = value.length >= 1;
            fieldValidationErrors.quantity = quantityValid ? '': ' Enter Quantity';
            case 'amount':
            amountValid = value.length >= 1;
            fieldValidationErrors.amount = amountValid ? '': ' Enter Amount';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        supplierValid: supplierValid,
                        itemValid: itemValid,
                        weightValid: weightValid,
                        quantityValid: quantityValid,
                        amountValid: amountValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.supplierValid && this.state.itemValid && this.state.quantityValid && this.state.weightValid && this.state.amountValid});
      }

      myFunction(event)
      {
          event.preventDefault();
          let myobject = {
              Date: this.state.date,
              Supplier: this.state.supplier,
              Category: this.state.category,
              Item: this.state.item,
              Quantity: this.state.quantity,
              Weight: this.state.weight,
              Amount: this.state.amount
              
          }
          alert('You entered: ' + JSON.stringify(myobject, 0, 2));
      }
    
    

render () {
  return (
    <Page className="header text-center" title="Purchases">
      <Row>
        <Col xl={6} lg={11} md={12}>
          <Card>
            <CardHeader className="header text-center">Purchase Entry</CardHeader>
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
                    id="exampleDate"
                    placeholder="date placeholder"
                    value = {this.state.date}
                  />
                  </FormGroup>
                  </Col>
                </Row>
                <Row form>
                <Col sm={6}>
                  <Label for="Supplier">
                    Supplier
                  </Label>
                    <Input
                      type="text"
                      name="supplier"
                      placeholder="Enter Name"
                      value={this.state.supplier}
                      onChange={this.handleUserInput} 
                    />
                  </Col>
                  <Col sm={3}>
                  <Label for="Category">
                    Category
                  </Label>
                    <Input type="select" name="category" value = {this.state.category}
                     onChange={this.handleUserInput} >
                    <option>PP</option>
                    <option>RC</option>
                    <option>Calpet</option>
                    <option>Color</option>
                    <option>Ink</option>
                    <option>Dhaga</option>
                    </Input>
                  </Col>
                  <Col sm={3}>
                  <Label for="Item">
                    Item
                  </Label>
                    <Input
                      type="text"
                      name="item"
                      placeholder="Enter Item"
                      value={this.state.item}
                      onChange={this.handleUserInput} 
                    />
                  </Col>
                </Row>
                <FormGroup row>
                  
                </FormGroup>
                <Row form>
                <Col sm={4}>
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
                <Col sm={4}>
                  <Label for="Weight">
                    Total Weight
                  </Label>
                  <InputGroup>
                
                  <Input
                      type="text"
                      name="weight"
                      placeholder="Enter Weight "
                      value={this.state.weight}
                      onChange={this.handleUserInput} 
                    />
                    <InputGroupAddon addonType="append">KG</InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col sm={4}>
                  <Label for="Amount">
                    Amount
                  </Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="amount"
                      placeholder="Enter Amount"
                      value={this.state.amount}
                      onChange={this.handleUserInput} 
                    />
                    <InputGroupAddon addonType="append">Rs</InputGroupAddon>
                    </InputGroup>
                  </Col>
                  
                  
                </Row>
                <div style={{ padding: '3rem' }}>
                <Button type="submit" onClick={this.myFunction} disabled={!this.state.formValid}>Add Purchase</Button>
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

export default PurchasePage;
