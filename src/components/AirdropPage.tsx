
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../contexts/Web3Context';
import { toast } from '@/hooks/use-toast';
import { Users, Gift, CheckCircle, ArrowLeft } from 'lucide-react';

interface AirdropPageProps {
  onBack: () => void;
}

const AirdropPage = ({ onBack }: AirdropPageProps) => {
  const { account, isConnected } = useWeb3();
  const [activeTab, setActiveTab] = useState<'referral' | 'tasks' | 'claim'>('referral');
  const [referredUsers, setReferredUsers] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [totalTokens, setTotalTokens] = useState(0);

  const referralLink = account ? `https://novachain.app/ref/${account}` : '';
  
  const socialTasks = [
    { id: 1, title: 'Follow us on Twitter', reward: 100, completed: false },
    { id: 2, title: 'Retweet our pinned post', reward: 100, completed: false },
    { id: 3, title: 'Join our Telegram group', reward: 100, completed: false },
    { id: 4, title: 'Share on Facebook', reward: 100, completed: false },
    { id: 5, title: 'Join our Discord server', reward: 100, completed: false },
    { id: 6, title: 'Subscribe to our YouTube', reward: 100, completed: false },
    { id: 7, title: 'Follow us on LinkedIn', reward: 100, completed: false },
    { id: 8, title: 'Join our Reddit community', reward: 100, completed: false },
    { id: 9, title: 'Follow us on Instagram', reward: 100, completed: false },
    { id: 10, title: 'Share in crypto groups', reward: 100, completed: false },
  ];

  const calculateTotalTokens = () => {
    const referralTokens = referredUsers.length * 500;
    const taskTokens = completedTasks.length * 100;
    return referralTokens + taskTokens;
  };

  const copyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    }
  };

  const completeTask = (taskId: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      toast({
        title: "Task completed!",
        description: "You earned 100 NOVA tokens",
      });
    }
  };

  const claimTokens = () => {
    const tokens = calculateTotalTokens();
    if (tokens > 0) {
      setTotalTokens(0);
      setReferredUsers([]);
      setCompletedTasks([]);
      
      // Add to pending transactions
      const pendingTx = {
        type: 'airdrop_claim',
        amount: tokens,
        timestamp: Date.now(),
        status: 'pending'
      };
      
      const existingTx = JSON.parse(localStorage.getItem('pendingAirdrops') || '[]');
      existingTx.push(pendingTx);
      localStorage.setItem('pendingAirdrops', JSON.stringify(existingTx));
      
      toast({
        title: "Claim submitted!",
        description: `${tokens} NOVA tokens claim is pending`,
      });
    }
  };

  const renderReferralTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
        <h3 className="text-xl font-semibold mb-4 text-purple-400">Your Referral Link</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-3 bg-black/50 border border-gray-600 rounded-lg text-white"
          />
          <button
            onClick={copyReferralLink}
            className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            Copy
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Share this link and earn 500 NOVA tokens for each person who signs up!
        </p>
      </div>

      <div className="bg-black/30 p-6 rounded-lg border border-gray-600">
        <h4 className="text-lg font-semibold mb-4 text-cyan-400">Referred Users ({referredUsers.length})</h4>
        {referredUsers.length === 0 ? (
          <p className="text-gray-400">No referrals yet. Start sharing your link!</p>
        ) : (
          <div className="space-y-2">
            {referredUsers.map((user, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                <span className="text-sm">{user}</span>
                <span className="text-green-400">+500 NOVA</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderTasksTab = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-cyan-400">Social Media Tasks</h3>
      <p className="text-gray-400 mb-6">Complete tasks to earn 100 NOVA tokens each</p>
      
      {socialTasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg border transition-all ${
            completedTasks.includes(task.id)
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-black/30 border-gray-600 hover:border-gray-500'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-gray-400">Reward: {task.reward} NOVA</p>
            </div>
            {completedTasks.includes(task.id) ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <button
                onClick={() => completeTask(task.id)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                Complete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderClaimTab = () => {
    const tokens = calculateTotalTokens();
    const pendingClaims = JSON.parse(localStorage.getItem('pendingAirdrops') || '[]');
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-6 rounded-lg border border-green-500/30">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Available to Claim</h3>
          <div className="text-3xl font-bold text-white mb-4">{tokens} NOVA</div>
          <button
            onClick={claimTokens}
            disabled={tokens === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              tokens > 0
                ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:shadow-lg'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {tokens > 0 ? 'Claim Tokens' : 'No tokens to claim'}
          </button>
        </div>

        <div className="bg-black/30 p-6 rounded-lg border border-gray-600">
          <h4 className="text-lg font-semibold mb-4 text-yellow-400">Pending Claims</h4>
          {pendingClaims.length === 0 ? (
            <p className="text-gray-400">No pending claims</p>
          ) : (
            <div className="space-y-2">
              {pendingClaims.map((claim: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                  <span>{claim.amount} NOVA</span>
                  <span className="text-yellow-400">Pending</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-black/30 p-4 rounded-lg border border-gray-600">
          <h5 className="font-semibold mb-2 text-gray-300">Token Breakdown:</h5>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Referrals ({referredUsers.length} × 500):</span>
              <span>{referredUsers.length * 500} NOVA</span>
            </div>
            <div className="flex justify-between">
              <span>Tasks ({completedTasks.length} × 100):</span>
              <span>{completedTasks.length * 100} NOVA</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-600 pt-1">
              <span>Total:</span>
              <span>{tokens} NOVA</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to access the airdrop</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              🪂 NOVA Airdrop
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-purple-500/20">
            <div className="flex border-b border-gray-600">
              <button
                onClick={() => setActiveTab('referral')}
                className={`flex-1 p-4 text-center transition-colors ${
                  activeTab === 'referral'
                    ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-5 h-5 mx-auto mb-1" />
                Referrals
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 p-4 text-center transition-colors ${
                  activeTab === 'tasks'
                    ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                Tasks
              </button>
              <button
                onClick={() => setActiveTab('claim')}
                className={`flex-1 p-4 text-center transition-colors ${
                  activeTab === 'claim'
                    ? 'bg-green-500/20 text-green-400 border-b-2 border-green-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Gift className="w-5 h-5 mx-auto mb-1" />
                Claim
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'referral' && renderReferralTab()}
              {activeTab === 'tasks' && renderTasksTab()}
              {activeTab === 'claim' && renderClaimTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirdropPage;
