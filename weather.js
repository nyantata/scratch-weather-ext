class WeatherExtension {
  getInfo() {
    return {
      id: 'weatherExt',
      name: '天気情報',
      blocks: [
        {
          opcode: 'getWeather',
          blockType: Scratch.BlockType.REPORTER,
          text: '緯度 [lat] 経度 [lon] の天気',
          arguments: {
            lat: { type: Scratch.ArgumentType.NUMBER, defaultValue: 35.68 },
            lon: { type: Scratch.ArgumentType.NUMBER, defaultValue: 139.76 }
          }
        }
      ]
    };
  }

  async getWeather(args) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${args.lat}&longitude=${args.lon}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();
    return `${data.current_weather.temperature}℃, ${data.current_weather.weathercode}`;
  }
}

Scratch.extensions.register(new WeatherExtension());
