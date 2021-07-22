import React, { Component, Fragment } from 'react'
import ContentEditable from 'react-contenteditable'

export class Tab extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             activeTab: this.props.children[this.props.active].props.label
        }
    }
    
    showDetails = (event) => {
        this.setState({
            activeTab: event.target.innerText
        })
        console.log(event.target.innerText)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            activeTab: nextProps.children[nextProps.active].props.label
        })
    }
    render() {
        return (
            <Fragment>
                <ul className="resp-tabs-list">
                    {this.props.children.map((child, i) => {
                        if(this.props.children.length === i + 1) {
                            if(this.props.last === "ADD") {
                                return <li key={i} onClick={this.showDetails} onInput={this.props.handleChange} tab={i} contentEditable="true" suppressContentEditableWarning={true} className={child.props.label === this.state.activeTab ? 'mr-md-1 resp-tab-item resp-tab-active' : 'mr-md-1 resp-tab-item'} aria-aria-controls="tab_item-0" role="tab" >{child.props.label}</li>
                            }
                            return <li key={i} onClick={this.showDetails}  className={child.props.label === this.state.activeTab ? 'mr-md-1 resp-tab-item resp-tab-active' : 'mr-md-1 resp-tab-item'} >{child.props.label}</li>
                        }
                        if(this.props.last === "ADD") {
                            return <li key={i} onClick={this.showDetails} onInput={this.props.handleChange} tab={i} contentEditable="true" suppressContentEditableWarning={true} className={child.props.label === this.state.activeTab? 'mr-md-1 resp-tab-item resp-tab-active' : 'mr-md-1 resp-tab-item'}>{child.props.label}</li>
                        }
                        return <li key={i} onClick={this.showDetails}  className={child.props.label === this.state.activeTab ? 'mr-md-1 resp-tab-item resp-tab-active' : 'mr-md-1 resp-tab-item'} >{child.props.label}</li>
                    }) }
                    {this.props.last === "ADD" ? <li onClick={this.props.click} className="mr-md-1" >{this.props.last}</li>
                            : null }
                     
                    {/* <li onClick={this.showDetails} className="mr-md-1">ALL ATTACHED</li>
                    <li onClick={this.showDetails} className="mr-md-1">CONDOS</li>
                    <li onClick={this.showDetails} className="mr-md-1">TOWNHOUSE</li>
                    <li onClick={this.showDetails} className="mr-md-1">COMMERCIAL</li>
                    <li onClick={this.showDetails} className>DETACHED HOUSE</li> */}
                </ul>
                <div className="resp-tabs-container">
                {this.props.children.map((child) => {
                    if (child.props.label !== this.state.activeTab) {
                        return undefined
                    };
                    return child
                })}
                </div>
            </Fragment>

        )
    }
}

export default Tab
