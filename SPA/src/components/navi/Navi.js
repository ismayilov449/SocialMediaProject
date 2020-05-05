import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/actions/userActions";
import { history } from "../../redux/services/helper/history";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";

class Navi extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  state = {
    logged: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <Link to="/">Northwind</Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink>
                  {this.props.user !== "undefined" ? (
                    <Link
                      to="/login"
                      onClick={() => {
                        this.setState({ logged: false });
                        userActions.logout();
                        history.push("/login");
                      }}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      // onClick={() => this.setState({ logged: true })}
                    >
                      Login
                    </Link>
                  )}
                </NavLink>
              </NavItem>

              {/* <CartSummary></CartSummary> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authenticationReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
