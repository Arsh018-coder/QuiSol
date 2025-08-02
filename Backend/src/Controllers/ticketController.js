//when ticket is created
await sendNotification({
  recipientId: req.user.id,
  message: '🎫 Your request has been submitted successfully.',
});

//when ticket is closed
if (ticket.status !== 'closed' && req.body.status === 'closed') {
  await sendNotification({
    recipientId: ticket.user_id,
    message: `✅ Your request "${ticket.title}" has been completed.`,
  });
}
