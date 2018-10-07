import { Provider, connect } from 'react-redux';
import AssistantUserProfile from "../Assistants/Assistant";

const mapStateToProperties = state => ({});

const mapDispatchToProperties = dispatch => ({});

export const AssistantProfile = connect(
  mapStateToProperties,
  mapDispatchToProperties
)(AssistantUserProfile);
