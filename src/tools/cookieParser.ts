function cookieParser(cookieString?: string): Record<string, string> {
    const cookies: Record<string, string> = {};
  
    if (cookieString) {
      const cookieArr = cookieString.split(';');
  
      for (const cookie of cookieArr) {
        const [name, value] = cookie.split('=');
        const cookieName = name.trim();
        const cookieValue = decodeURIComponent(value.trim());
        cookies[cookieName] = cookieValue;
      }
    }
  
    return cookies;
}

export default cookieParser