import React from "react";
import Loader from "../../components/loader/loader";

export default function Profile({ user }) {
  return (
    <div>
      {user ? (
        <>
          <h1>{user.username}'s profile</h1>
          <h2>
            Email:{" "}
            <a
              href={`mailto:${user.email}`}
              className="text-blue-400 underline"
            >
              {user.email}
            </a>
          </h2>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
