const Notification = ({ notification }) => {
  if (notification === null) return null;

  return (
    <div
      className={`${notification.type === "success" ? "notification" : "error"}`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
