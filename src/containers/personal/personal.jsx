import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {

  logout = () => {
    Modal.alert('Logout', 'are you sure?', [
      {text: 'cancel'},
      {
        text: 'ok',
        onPress: ()=> {
          Cookies.remove('userid')
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const {username, info, header, company, post, salary} = this.props.user
    return (
      <div style={{marginBottom:50, marginTop:50}}>
        <Result
          img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />

        <List renderHeader={() => 'Info'}>
          <Item multipleLine>
            <Brief>Position: {post}</Brief>
            <Brief>Info: {info}</Brief>
            {salary ? <Brief>Salary: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>Logout</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)