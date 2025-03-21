export const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
  
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short', // 'Mon'
      year: 'numeric', // '2025'
      month: 'short', // 'Mar'
      day: 'numeric', // '21'
      hour: '2-digit', // '10'
      minute: '2-digit', // '30'
      second: '2-digit', // '59'
    }).format(date);
  };