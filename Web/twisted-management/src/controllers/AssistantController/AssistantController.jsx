import React from "react";

const AssistantController = (ViewComponent, DisplayCount) =>
  class AssistantController extends Component {
    constructor(props) {
      super(props);
      this.state = {
        assistantsSource: [],
        loading: false
      };
    }

    componentWillMount() {
      this.setState({ loading: true });
    }

    render() {
      const { assistantsSource } = this.state;
      return (
        <div className="data-component">
          {<ViewComponent DataSource={assistantsSource} />}
        </div>
      );
    }
  };

export default AssistantController;
