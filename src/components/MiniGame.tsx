
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

type GameState = 'playing' | 'gameover';
type Direction = 'up' | 'down' | 'left' | 'right' | null;

interface Coin {
  x: number;
  y: number;
  rotation: number;
  speedX: number;
  speedY: number;
  scale: number;
}

interface GameStats {
  score: number;
  time: number;
  level: number;
  date: string;
}

const MiniGame = () => {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [level, setLevel] = useState(1);
  const [direction, setDirection] = useState<Direction>(null);
  const [playerPos, setPlayerPos] = useState({ x: 150, y: 150 });
  const [coins, setCoins] = useState<Coin[]>([]);
  const [gameStats, setGameStats] = useState<GameStats[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Требуется авторизация",
          description: "Пожалуйста, войдите в систему, чтобы играть",
        });
        navigate('/auth');
        return;
      }
      
      setUser(session.user);
      
      // Get user metadata
      if (session.user?.user_metadata?.username) {
        setUsername(session.user.user_metadata.username);
      } else {
        setUsername(session.user.email.split('@')[0]);
      }
      
      // Load user game stats
      loadGameStats(session.user.id);
      
      // Subscribe to real-time updates for this user's game_stats
      subscribeToGameStats(session.user.id);
    };
    
    checkUser();
    
    return () => {
      // Clean up realtime subscription when component unmounts
      unsubscribeFromGameStats();
    };
  }, [navigate]);
  
  // Real-time subscription to game_stats
  const subscribeToGameStats = (userId: string) => {
    const channel = supabase
      .channel('game_stats_changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'game_stats',
          filter: `user_id=eq.${userId}`
        }, 
        (payload) => {
          console.log('Game stats changed:', payload);
          // Refresh game stats when they change
          loadGameStats(userId);
        }
      )
      .subscribe();
      
    return channel;
  };
  
  const unsubscribeFromGameStats = () => {
    supabase.removeChannel(supabase.getChannels().find(channel => 
      channel.topic === 'realtime:public:game_stats'));
  };

  const loadGameStats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('game_stats')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        const formattedStats = data.map(stat => ({
          score: stat.score,
          time: stat.time_played,
          level: stat.level,
          date: new Date(stat.created_at).toLocaleDateString('ru-RU')
        }));
        
        setGameStats(formattedStats);
        
        // Calculate total tokens
        const total = data.reduce((sum, stat) => sum + stat.score, 0);
        setTotalTokens(total);
      }
    } catch (error) {
      console.error('Error loading game stats:', error);
    }
  };

  const generateCoin = () => {
    // Create more interesting coins with random movement patterns
    const newCoin = {
      x: Math.floor(Math.random() * 280) + 10,
      y: Math.floor(Math.random() * 280) + 10,
      rotation: Math.random() * Math.PI * 2, // Random rotation
      speedX: (Math.random() - 0.5) * 1.5, // Random X speed
      speedY: (Math.random() - 0.5) * 1.5, // Random Y speed
      scale: 0.8 + Math.random() * 0.4 // Random size (0.8 to 1.2)
    };
    setCoins(prev => [...prev, newCoin]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (gameState !== 'playing') return;

    switch (e.key) {
      case 'ArrowUp':
        setDirection('up');
        break;
      case 'ArrowDown':
        setDirection('down');
        break;
      case 'ArrowLeft':
        setDirection('left');
        break;
      case 'ArrowRight':
        setDirection('right');
        break;
    }
  };

  const handleKeyUp = () => {
    setDirection(null);
  };

  const handleDirectionClick = (dir: Direction) => {
    if (gameState !== 'playing') return;
    setDirection(dir);
    // Auto release after a short time for mobile
    setTimeout(() => setDirection(null), 100);
  };

  const startGame = () => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Пожалуйста, войдите в систему, чтобы играть",
      });
      navigate('/auth');
      return;
    }
    
    setGameState('playing');
    setScore(0);
    setTimer(60);
    setLevel(1);
    setPlayerPos({ x: 150, y: 150 });
    setCoins([]);
    
    // Generate initial coins
    for (let i = 0; i < 5; i++) {
      generateCoin();
    }
  };

  const endGame = async () => {
    setGameState('gameover');
    
    if (!user) return;
    
    try {
      // Save game stats to Supabase
      const { error } = await supabase
        .from('game_stats')
        .insert({
          user_id: user.id,
          score: score,
          level: level,
          time_played: 60 - timer
        });
        
      if (error) throw error;
      
      toast({
        title: "Игра завершена!",
        description: `Вы заработали ${score} КЭИ токенов`,
      });
      
      // Stats will be updated automatically via realtime subscription
    } catch (error) {
      console.error('Error saving game stats:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить результаты игры",
        variant: "destructive"
      });
    }
  };

  const restartGame = () => {
    startGame();
  };

  useEffect(() => {
    // Set up event listeners for keyboard controls
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Start game automatically if user is logged in
    if (user) {
      startGame();
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [user]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Move player based on direction
      if (direction) {
        const moveSpeed = 5;
        const newPos = { ...playerPos };
        
        switch (direction) {
          case 'up':
            newPos.y = Math.max(10, newPos.y - moveSpeed);
            break;
          case 'down':
            newPos.y = Math.min(canvas.height - 10, newPos.y + moveSpeed);
            break;
          case 'left':
            newPos.x = Math.max(10, newPos.x - moveSpeed);
            break;
          case 'right':
            newPos.x = Math.min(canvas.width - 10, newPos.x + moveSpeed);
            break;
        }
        
        setPlayerPos(newPos);
      }
      
      // Draw player (as a circular gradient with glow)
      const glowSize = 5 + Math.sin(Date.now() / 300) * 2;
      
      // Draw glow
      const glowGradient = ctx.createRadialGradient(
        playerPos.x, playerPos.y, 0,
        playerPos.x, playerPos.y, 25 + glowSize
      );
      glowGradient.addColorStop(0, 'rgba(51, 195, 240, 0.6)');
      glowGradient.addColorStop(1, 'rgba(51, 195, 240, 0)');
      
      ctx.beginPath();
      ctx.arc(playerPos.x, playerPos.y, 25 + glowSize, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
      
      // Draw player body
      const gradient = ctx.createRadialGradient(
        playerPos.x - 5, playerPos.y - 5, 0,
        playerPos.x, playerPos.y, 15
      );
      gradient.addColorStop(0, '#33C3F0');
      gradient.addColorStop(0.7, '#8B5CF6');
      gradient.addColorStop(1, '#6E59A5');
      
      ctx.beginPath();
      ctx.arc(playerPos.x, playerPos.y, 15, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add shine effect
      ctx.beginPath();
      ctx.arc(playerPos.x - 5, playerPos.y - 5, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      
      // Update and draw coins with motion
      const updatedCoins: Coin[] = [];
      let collectedCoins = 0;
      
      coins.forEach(coin => {
        // Update coin position with its speed
        const updatedCoin = {
          ...coin,
          x: coin.x + coin.speedX,
          y: coin.y + coin.speedY,
          rotation: coin.rotation + 0.02 // Slowly rotate coin
        };
        
        // Bounce off walls
        if (updatedCoin.x <= 10 || updatedCoin.x >= canvas.width - 10) {
          updatedCoin.speedX *= -1;
        }
        if (updatedCoin.y <= 10 || updatedCoin.y >= canvas.height - 10) {
          updatedCoin.speedY *= -1;
        }
        
        // Check if collected
        const dx = playerPos.x - updatedCoin.x;
        const dy = playerPos.y - updatedCoin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 25) { // Collection radius
          collectedCoins++;
        } else {
          // Draw 3D coin
          ctx.save();
          ctx.translate(updatedCoin.x, updatedCoin.y);
          ctx.rotate(updatedCoin.rotation);
          ctx.scale(updatedCoin.scale, updatedCoin.scale);
          
          // Draw coin glow
          const coinGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
          coinGlow.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
          coinGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
          
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fillStyle = coinGlow;
          ctx.fill();
          
          // Draw 3D coin
          // Main coin body (golden ellipse)
          ctx.beginPath();
          ctx.ellipse(0, 0, 10, 10 * Math.abs(Math.cos(updatedCoin.rotation)), 0, 0, Math.PI * 2);
          const coinGradient = ctx.createLinearGradient(-10, -10, 10, 10);
          coinGradient.addColorStop(0, '#FFC107');
          coinGradient.addColorStop(0.5, '#FFD700');
          coinGradient.addColorStop(1, '#FF9800');
          ctx.fillStyle = coinGradient;
          ctx.fill();
          
          // Draw coin edge
          ctx.beginPath();
          ctx.ellipse(0, 0, 10, 10 * Math.abs(Math.cos(updatedCoin.rotation)), 0, 0, Math.PI * 2);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#FFA000';
          ctx.stroke();
          
          // Draw KЭИ text on coin - adjust for perspective
          ctx.fillStyle = 'white';
          ctx.font = 'bold 8px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('КЭИ', 0, 0);
          
          // Add shine effect
          const shineSize = 3 * Math.abs(Math.cos(updatedCoin.rotation));
          ctx.beginPath();
          ctx.ellipse(-3, -3, shineSize, shineSize, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
          
          ctx.restore();
          updatedCoins.push(updatedCoin);
        }
      });
      
      if (collectedCoins > 0) {
        // Update score
        setScore(prev => prev + collectedCoins);
        
        // Generate new coins
        for (let i = 0; i < collectedCoins; i++) {
          generateCoin();
        }
      }
      
      // Update coins array with moved coins
      setCoins(updatedCoins);
      
      // Level up logic
      if (score >= level * 10) {
        setLevel(prev => prev + 1);
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, playerPos, coins, direction, score, level]);

  if (!user) {
    return (
      <section id="game" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Мини-игра КЭИ Собиратель</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Чтобы играть и собирать токены КЭИ, вам необходимо войти в систему.
          </p>
          <div className="flex justify-center">
            <Link to="/auth" className="crypto-button flex items-center gap-2">
              Войти в систему
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="game" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Мини-игра КЭИ Собиратель</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Соберите как можно больше токенов КЭИ за 60 секунд! 
          Используйте стрелки или экранное управление для передвижения.
        </p>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Game Container */}
          <div className="flex-1 glass rounded-lg p-6 border border-space-accent/20">
            {gameState === 'playing' && (
              <div>
                <div className="flex justify-between mb-4">
                  <div className="glass px-4 py-2 rounded-lg">
                    <span className="font-bold">Счет: {score}</span>
                  </div>
                  <div className="glass px-4 py-2 rounded-lg">
                    <span className="font-bold">Время: {timer}</span>
                  </div>
                  <div className="glass px-4 py-2 rounded-lg">
                    <span className="font-bold">Уровень: {level}</span>
                  </div>
                </div>

                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  className="game-canvas w-full aspect-square mb-4 bg-space-dark/30 rounded-lg"
                />

                {/* Mobile Controls */}
                <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                  <div></div>
                  <button
                    className="flex justify-center items-center p-4 rounded-lg glass active:bg-space-accent/30"
                    onClick={() => handleDirectionClick('up')}
                  >
                    <ArrowUp />
                  </button>
                  <div></div>
                  
                  <button
                    className="flex justify-center items-center p-4 rounded-lg glass active:bg-space-accent/30"
                    onClick={() => handleDirectionClick('left')}
                  >
                    <ArrowLeft />
                  </button>
                  <div></div>
                  <button
                    className="flex justify-center items-center p-4 rounded-lg glass active:bg-space-accent/30"
                    onClick={() => handleDirectionClick('right')}
                  >
                    <ArrowRight />
                  </button>
                  
                  <div></div>
                  <button
                    className="flex justify-center items-center p-4 rounded-lg glass active:bg-space-accent/30"
                    onClick={() => handleDirectionClick('down')}
                  >
                    <ArrowDown />
                  </button>
                  <div></div>
                </div>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="flex flex-col items-center justify-center h-[350px]">
                <h3 className="text-xl font-bold mb-4">Игра окончена!</h3>
                <p className="text-lg mb-6">Ваш счет: {score} КЭИ</p>
                <div className="flex gap-4">
                  <button
                    onClick={restartGame}
                    className="crypto-button py-2 px-6"
                  >
                    Играть снова
                  </button>
                  <button
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                    className="bg-space-dark border border-space-accent text-white py-2 px-6 rounded-lg hover:bg-space-dark/80 transition-colors"
                  >
                    {showLeaderboard ? 'Скрыть' : 'Статистика'}
                  </button>
                </div>

                {showLeaderboard && (
                  <div className="mt-6 w-full glass rounded-lg p-4">
                    <h4 className="text-lg font-bold mb-2">Ваши результаты:</h4>
                    <div className="max-h-[200px] overflow-y-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-space-accent/30">
                            <th className="py-2 text-left">Дата</th>
                            <th className="py-2 text-right">Счет</th>
                            <th className="py-2 text-right">Время</th>
                            <th className="py-2 text-right">Уровень</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gameStats.map((stat, i) => (
                            <tr key={i} className="border-b border-space-accent/10">
                              <td className="py-2 text-left">{stat.date}</td>
                              <td className="py-2 text-right">{stat.score} КЭИ</td>
                              <td className="py-2 text-right">{stat.time} сек</td>
                              <td className="py-2 text-right">{stat.level}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Stats */}
          <div className="flex-1 glass rounded-lg p-6 border border-space-accent/20">
            <h3 className="text-xl font-bold mb-4 text-center">Ваш аккаунт</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-space-accent/30 flex items-center justify-center text-xl font-bold">
                {username?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <p className="text-center text-lg mb-2">{username}</p>
            <p className="text-center text-sm text-gray-400 mb-6">{user?.email}</p>
            
            <div className="text-center mb-6">
              <div className="bg-space-dark/50 rounded-lg p-4 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-space-accent/10 to-transparent animate-pulse"></div>
                <p className="text-sm text-gray-300 mb-1">Всего накоплено токенов:</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="enhanced-coin-small relative">
                    <div className="coin-inner-small"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400/20 to-transparent"></div>
                  </div>
                  <p className="text-2xl font-bold">X</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Токены будут доступны для получения после выхода монеты на биржу
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-2 text-center">Текущий курс КЭИ</h4>
              <div style={{ height: '200px' }}>
                <iframe 
                  src="https://dexscreener.com/solana/9d9mb8kooFfaD3SctgZtkxQypkshx6ezhbKio89ixyy2?embed=1&loadChartSettings=0&trades=0&tabs=0&chartLeftToolbar=0&chartTimeframesToolbar=0&loadChartSettings=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
                  style={{ height: "100%", width: "100%" }}
                  title="DEX Screener"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiniGame;
