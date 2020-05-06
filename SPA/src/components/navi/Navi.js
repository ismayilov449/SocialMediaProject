import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/actions/userActions";
import { history } from "../../redux/services/helper/history";
import { bindActionCreators } from "redux";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import "../posts/PostStyle.css";

class Navi extends Component {
  state = {
    isOpen: false,
    logged: false,
    user: null,
  };

  componentDidMount() {
    var currUser = JSON.parse(localStorage.getItem("user")) ?? null;
    this.setState({ user: currUser });

    //console.log(this.props.user);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <div class="post">
            <NavbarBrand>
              <Link to="/">Northwind</Link>
            </NavbarBrand>
            {/* {console.log(this.props.user)} */}
            <Collapse navbar>
              {/* <Nav className="mr-auto" navbar> */}
              <Nav navbar>
                {/* {console.log(this.props.user)} */}
                {this.props.user === undefined ? (
                  console.log("a" + typeof this.props.user)
                ) : (
                  <NavItem>
                    <NavLink>
                      <ButtonDropdown
                        toggle={() => this.toggle()}
                        isOpen={this.state.isOpen}
                      >
                        <DropdownToggle outline color="info" size="sm">
                          {this.props.user.user !== undefined
                            ? this.props.user.user.username
                            : " "}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>
                            <Link
                              size="sm"
                              onClick={() => {
                                this.props.actions.logout();
                                history.push("/");
                              }}
                            >
                              Logout
                            </Link>{" "}
                          </DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </NavLink>
                  </NavItem>
                )}

                {/* <CartSummary></CartSummary> */}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authenticationReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(userActions.logout, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
