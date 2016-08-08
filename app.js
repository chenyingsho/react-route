const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;
const IndexRoute = ReactRouter.IndexRoute;
const App = React.createClass({
    getInitialState: function () {
        return {
            isEditor: true,
            elements: []
        }
    },
    toggle: function () {
        this.setState({
            isEditor: !this.state.isEditor
        });
    },
    addElement:function (element) {
        const elements=this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    deleteElement:function (index) {
        const elements=this.state.elements;
        elements.splice(index,1);
        this.setState({elements});
    },
    render: function () {
        return <div>
            <ReactRouter.Link to="/preview">
                Preview
            </ReactRouter.Link>
            {this.props.children && React.cloneElement(this.props.children,{
                elements:this.state.elements,
                onadd:this.addElement,
                onDelete:this.deleteElement
            })}
        </div>;
    }
});

const Editor = React.createClass({

    render: function () {
        return <div>
            <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
            <Right onadd={this.props.onadd}/>
        </div>;
    }
});

const Left = React.createClass({
    remove:function (index) {
        this.props.onDelete(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div key={index}>
                <input type={ele}/>
                <button onClick={this.remove.bind(this,index)}>X</button>
            </div>;
        });
        return <div>
            {elements}
        </div>
    }
});

const Right = React.createClass({
    add: function () {
        const element = $("input[name=element]:checked").val();
        this.props.onadd(element);
    },render: function () {
        return <div>
            <input type="radio" name="element" value="text"/>Text
            <input type="radio" name="element" value="date"/>Date
            <button onClick={this.add}>+</button>
        </div>;
    }
});
const Preview = React.createClass({
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div key={index}>

                <input type={ele}/>
            </div>;
        });
        return <div>
            <ReactRouter.Link to="/">
                Editor
            </ReactRouter.Link>
            {elements}
            <button>summit</button>
        </div>
    }
});


ReactDOM.render((<Router>
    <Route path="/" component={App}>
        <IndexRoute component={Editor}/>
        <Route path="Preview" component={Preview}/>
    </Route>
</Router>), document.getElementById('content'));