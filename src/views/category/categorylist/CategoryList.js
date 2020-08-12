import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryForm from "../form/CategoryForm";
import Item from "./Item/Item";
import { Spinner } from "reactstrap";
import { Empty } from "antd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
} from "reactstrap";

import { getAllCategory } from "../../../redux/category/action";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
    };
  }

  async componentDidMount() {
    const token = await window.localStorage.getItem("userToken");
    await this.props.fetchCategories(token);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { loading, error, categories } = this.props.data;
    const { searchKey } = this.state;
    return (
      <>
        <CategoryForm />
        <div className="panel panel-default">
          <div className="panel-heading" style={{ height: "55px" }}>
            <Form onSubmit={this.onSearch}>
              <InputGroup style={{ width: "50%", float: "right" }}>
                <Input
                  type="text"
                  name="searchKey"
                  onChange={this.onChange}
                  defaultValue={searchKey}
                  placeholder="Search ..."
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fas fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            <h3 className="panel-title" style={{ paddingTop: "5px" }}>
              Category List
            </h3>
          </div>
          <div className="panel-body">
            {error === null && error === undefined ? (
              <div>An error occur: {error}</div>
            ) : !loading ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories !== null && categories !== undefined ? (
                    categories.map((category, index) =>
                      category.name
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) !== -1 ? (
                        <Item
                          key={index}
                          index={index + 1}
                          category={category}
                        />
                      ) : null
                    )
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <Empty />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="text-center">
                <Spinner color="primary" />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (token) => {
      dispatch(getAllCategory(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
