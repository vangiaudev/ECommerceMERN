import React from 'react'
import { Form, Button } from "react-bootstrap";
const SearchBox = () => {
  return (
    <Form  className="d-flex ">
      <Form.Control style={{marginLeft: "1.5rem"}}
        type="text"
        name="q"
        placeholder="Nhập tên sản phẩm..."
        className="mr-sm2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-secondary" style={{marginLeft: "0.5rem"}}>
        Tìm
      </Button>
    </Form>
  )
}
export default SearchBox
