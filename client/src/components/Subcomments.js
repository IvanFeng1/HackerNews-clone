import React, { Fragment } from "react";

import { get_sub_comments } from "../queries/queries.js";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import CommentTile from "./CommentTile.js";
import Loading from "./Loading.js";
function Subcomments({ id, currentMargin }) {
  const itemID = id;
  const { loading, error, data, networkStatus } = useQuery(get_sub_comments, {
    variables: {
      id: parseInt(itemID), // parseInt makes query work
    },
    notifyOnNetworkStatusChange: true,
  });
  if (loading && networkStatus != 3) return <CircularProgress />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const newMargin = currentMargin + 4;

  return (
    <Fragment>
      {data.subcomments &&
        data.subcomments.childComments &&
        data.subcomments.childComments.length > 0 &&
        data.subcomments.childComments.map((comment) => (
          <CommentTile
            text={comment.text}
            user={comment.user}
            id={comment.id}
            marginAmount={newMargin}
          />
        ))}
    </Fragment>
  );
}

export default Subcomments;
