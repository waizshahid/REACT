import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const tableTypes = ['hover'];

const TablePage = () => {
  return (
    <Page
      title="All Orders"
      className="TablePage"
    >
      {tableTypes.map((tableType, index) => (
        <Row key={index}>
          <Col>
            <Card className="mb-3">
              <CardHeader>{tableType || 'default'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <Table {...{ [tableType || 'default']: true }}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Brand Name</th>
                            <th>Size</th>
                            <th>Quality</th>
                            <th>Frame</th>
                            <th>No. of Bags</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                            <td>bla</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                 
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}

    
    </Page>
  );
};

export default TablePage;
